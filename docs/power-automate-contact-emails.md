# Power Automate: contact inquiry emails

The public contact form saves each inquiry in the Payload collection `contact-submissions`. This flow reads unsent records and sends two emails:

1. A confirmation from a noreply mailbox to the person who submitted the form.
2. The inquiry to `coopadmissions@schools.nyc.gov`, with Reply-To set to the visitor so admissions can answer them directly.

The site does not send these emails. Power Automate does.

## 1. Create an API key

Power Automate needs a logged-in Payload user to read and update submissions.

1. Open `/admin` and sign in.
2. Open your user under **Users**.
3. Enable **API Key** and save. Copy the key once and store it in Power Automate. Do not commit it to the repo.
4. If the API Key field is missing, restart the app after this change and open the user again.

Use this header on every request:

```http
Authorization: users API-Key YOUR_API_KEY
Content-Type: application/json
```

Replace `YOUR_API_KEY` with the key from the user screen. The word `users` is the collection slug and must stay as written.

## 2. Create the flow

1. In [Power Automate](https://make.powerautomate.com), choose **Create** → **Scheduled cloud flow**.
2. Name it `Coop Tech contact emails`.
3. Set the recurrence to every **5 minutes**.
4. Open the flow settings and set **Concurrency control** to **On** with a degree of parallelism of **1**. That stops two runs from emailing the same inquiry.

Use the live site URL with no trailing slash, for example `https://www.co-optech.org`. Locally that is `http://localhost:3000`.

## 3. Get unsent inquiries

Add an **HTTP** action.

| Setting | Value |
| --- | --- |
| Method | GET |
| URI | `https://www.co-optech.org/api/contact-submissions?where[emailsSent][equals]=false&sort=createdAt&limit=20` |
| Headers | `Authorization` = `users API-Key YOUR_API_KEY` |

`emailsSent` is `false` until this flow marks the record done. `staffEmail` on each record is `coopadmissions@schools.nyc.gov`. `subject` is already filled, for example `Coop Tech inquiry: Admissions — Jane Doe`.

Add **Parse JSON** after the HTTP action.

- Content: `Body` from the HTTP action.
- Schema: use **Generate from sample** with this sample.

```json
{
  "docs": [
    {
      "id": "66f0abc1234567890abcdef0",
      "name": "Jane Doe",
      "email": "jane@example.com",
      "phone": "212-555-0100",
      "role": "Parent or guardian",
      "inquiryType": "Admissions",
      "preferredContact": "Email",
      "studentName": "Alex Doe",
      "homeSchool": "Example High School",
      "program": "Automotive Services",
      "campus": "Coop Tech Main Campus",
      "message": "We would like to apply for the fall.",
      "subject": "Coop Tech inquiry: Admissions — Jane Doe",
      "staffEmail": "coopadmissions@schools.nyc.gov",
      "emailsSent": false,
      "status": "new",
      "createdAt": "2026-09-21T18:00:00.000Z"
    }
  ]
}
```

## 4. Send both emails for each record

Add **Apply to each**. Select `docs` from the Parse JSON action.

Inside the loop, add two **Send an email from a shared mailbox (V2)** actions from the Office 365 Outlook connector. Connect them with the noreply mailbox, and give that mailbox **Send As** permission. Use the same noreply mailbox for both messages.

### Email 1 — confirmation to the visitor

| Field | Value |
| --- | --- |
| Original Mailbox Address | the noreply mailbox |
| To | `email` from the current item |
| Subject | `subject` from the current item |
| Body | the confirmation text below |

```html
<p>Hello @{items('Apply_to_each')?['name']},</p>
<p>We received your Coop Tech inquiry about @{items('Apply_to_each')?['inquiryType']}.</p>
<p>Admissions will follow up at this email address. If you need a faster reply, write to coopadmissions@schools.nyc.gov.</p>
<p>School of Cooperative Technical Education<br>321 East 96th Street, New York, NY 10128<br>(212) 369-8800</p>
```

Power Automate will insert the dynamic content when you pick `name` and `inquiryType` from the current item. The `items('Apply_to_each')` text above matches the default loop name. If you rename the loop, use the name Power Automate shows.

### Email 2 — inquiry to admissions

| Field | Value |
| --- | --- |
| Original Mailbox Address | the same noreply mailbox |
| To | `staffEmail` from the current item |
| Reply To | `email` from the current item |
| Subject | `subject` from the current item |
| Body | the inquiry text below |

```html
<p>A new inquiry was submitted on the Coop Tech website.</p>
<ul>
  <li><strong>Name:</strong> @{items('Apply_to_each')?['name']}</li>
  <li><strong>Email:</strong> @{items('Apply_to_each')?['email']}</li>
  <li><strong>Phone:</strong> @{items('Apply_to_each')?['phone']}</li>
  <li><strong>Role:</strong> @{items('Apply_to_each')?['role']}</li>
  <li><strong>Inquiry:</strong> @{items('Apply_to_each')?['inquiryType']}</li>
  <li><strong>Preferred contact:</strong> @{items('Apply_to_each')?['preferredContact']}</li>
  <li><strong>Student name:</strong> @{items('Apply_to_each')?['studentName']}</li>
  <li><strong>Home school:</strong> @{items('Apply_to_each')?['homeSchool']}</li>
  <li><strong>Program:</strong> @{items('Apply_to_each')?['program']}</li>
  <li><strong>Campus:</strong> @{items('Apply_to_each')?['campus']}</li>
</ul>
<p>@{items('Apply_to_each')?['message']}</p>
```

Reply to the visitor from the admissions message. Do not put the visitor in the To field of this second email.

## 5. Mark the inquiry as sent

Still inside the loop, after both email actions, add an **HTTP** action.

| Setting | Value |
| --- | --- |
| Method | PATCH |
| URI | `https://www.co-optech.org/api/contact-submissions/` plus the current item `id` |
| Headers | `Authorization` = `users API-Key YOUR_API_KEY` and `Content-Type` = `application/json` |
| Body | `{ "emailsSent": true }` |

Open the **...** menu on this PATCH action, choose **Configure run after**, and leave only **is successful** checked for both email actions. If either email fails, `emailsSent` stays false and the next run tries again.

A retry can send the confirmation a second time if the first email succeeded and the second failed. That is safer than dropping the admissions copy.

## 6. Test

1. Submit the form on `/contact` with your own email address.
2. In `/admin`, open **Contact submissions** and confirm `emailsSent` is off.
3. Run the flow with **Test** → **Manually**.
4. Confirm the noreply confirmation arrived, and that admissions received the inquiry with your address on Reply-To.
5. Confirm `emailsSent` is now on, and run the flow again. It should not send a second pair.

## Field reference

| API field | Form label |
| --- | --- |
| `name` | Full name |
| `email` | Email |
| `phone` | Phone |
| `role` | I am a |
| `inquiryType` | What is this about? |
| `preferredContact` | Best way to reach you |
| `studentName` | Student name |
| `homeSchool` | Home school |
| `program` | Program interest |
| `campus` | Preferred campus |
| `message` | Message |
| `subject` | Set by the site for both email subjects |
| `staffEmail` | Always `coopadmissions@schools.nyc.gov` |
| `emailsSent` | Set to `true` by this flow after both emails |
| `status` | Staff workflow in the admin. Leave it alone in this flow |
