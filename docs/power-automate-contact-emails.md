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
4. Open the **Recurrence** trigger → **...** → **Settings**, and set **Concurrency control** to **On** with a degree of parallelism of **1**. If one run takes longer than 5 minutes, the next waits instead of emailing the same inquiries again.

Use the live site URL with no trailing slash, for example `https://www.co-optech.org`. Locally that is `http://localhost:3000`.

## 3. Get unsent inquiries

Add an **HTTP** action.

| Setting | Value |
| --- | --- |
| Method | GET |
| URI | `https://www.co-optech.org/api/contact-submissions?where[emailsSent][equals]=false&sort=createdAt&limit=20` |
| Headers | `Authorization` = `users API-Key YOUR_API_KEY` |

`emailsSent` is `false` until this flow marks the record done. `staffEmail` on each record is `coopadmissions@schools.nyc.gov`. `subject` is already filled, for example `Coop Tech inquiry: Admissions — Jane Doe`.

### Stop when there is nothing new

Most runs find no new inquiries. Add a **Condition** right after the HTTP action, so those runs stop early and are easy to spot in run history.

| Setting | Value |
| --- | --- |
| Left value (expression) | `length(body('HTTP')?['docs'])` |
| Operator | is greater than |
| Right value | `0` |

Use your GET action's name in place of `'HTTP'` if you renamed it. Spaces in the name become underscores, for example `body('Get_unsent_inquiries')`.

- **False:** add **Terminate** with status **Succeeded**. Do not use Failed, or every quiet run shows as an error.
- **True:** put the rest of the flow here: Parse JSON, then Apply to each (steps below).

The flow then looks like this:

```text
Recurrence (every 5 min, concurrency 1)
└─ HTTP: GET unsent inquiries
   └─ Condition: length(docs) > 0
      ├─ True
      │  ├─ Parse JSON
      │  └─ Apply to each docs
      │     ├─ Email 1: confirmation to visitor
      │     ├─ Email 2: inquiry to admissions
      │     └─ HTTP: PATCH emailsSent = true
      └─ False
         └─ Terminate (Succeeded)
```

### Parse the response

In the **True** branch, add **Parse JSON**.

- Content: `Body` from the HTTP action.
- Schema: paste the schema below. Do not use **Generate from sample**: it marks every field as required. Payload leaves out empty optional fields such as `phone`, `studentName`, `homeSchool`, `program` and `campus`, so a generated schema fails with `ValidationFailed`.

```json
{
  "type": "object",
  "properties": {
    "docs": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "id": { "type": "string" },
          "name": { "type": "string" },
          "email": { "type": "string" },
          "phone": { "type": ["string", "null"] },
          "role": { "type": "string" },
          "inquiryType": { "type": "string" },
          "preferredContact": { "type": ["string", "null"] },
          "studentName": { "type": ["string", "null"] },
          "homeSchool": { "type": ["string", "null"] },
          "program": { "type": ["string", "null"] },
          "campus": { "type": ["string", "null"] },
          "message": { "type": "string" },
          "subject": { "type": "string" },
          "staffEmail": { "type": "string" },
          "emailsSent": { "type": ["boolean", "null"] },
          "status": { "type": ["string", "null"] },
          "createdAt": { "type": "string" }
        },
        "required": ["id", "name", "email", "role", "inquiryType", "message", "subject", "staffEmail"]
      }
    },
    "hasNextPage": { "type": "boolean" }
  }
}
```

In email bodies, read optional fields with `?[...]`, for example `@{items('Apply_to_each')?['studentName']}`. A missing field then prints as blank and doesn't fail the run.

## 4. Send both emails for each record

In the **True** branch, after Parse JSON, add **Apply to each**. Select `docs` from the Parse JSON action. Leave its own concurrency setting off, so records are handled one at a time.

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
| URI (expression) | `concat('https://www.co-optech.org/api/contact-submissions/', item()?['id'])` |
| Headers | `Authorization` = `users API-Key YOUR_API_KEY` and `Content-Type` = `application/json` |
| Body | `{ "emailsSent": true }` |

The method must be **PATCH**. POST or PUT to this URL returns 404 `Route not found`. `true` in the body is a boolean, so do not put it in quotes.

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
