import { Resend } from 'resend';
import fs from 'fs';
import { parse } from 'csv-parse/sync';

const resend = new Resend('***REMOVED***');

async function sendBatch(emails: string[]) {
  const promises = emails.map(email => {
    return resend.emails.send({
      from: 'Naman @ PM Streak <hello@learnanything.pro>',
      to: [email],
      subject: 'Congratulations on the offer! But...',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <h1 style="color: #58cc02;">Congratulations on the offer!</h1>
          <p>Wait, did you actually get it? Or are you just reading this email thinking about the one that got away?</p>
          <p>Product management roles are at an all-time high, but so is the competition. If you're serious about your streak, it's time to double down.</p>
          <p>Check out your personalized roadmap on <strong>PM Streak</strong> and don't let another offer slip through the cracks.</p>
          <a href="https://learnanything.pro" style="background-color: #58cc02; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Start your streak</a>
          <br/><br/>
          <p style="font-size: 12px; color: #999;">If you'd like to unsubscribe, please reply with 'stop'.</p>
        </div>
      `
    });
  });

  const results = await Promise.allSettled(promises);
  console.log(\`Batch processed: \${results.length} emails\`);
}

async function run() {
  const leadsFile = process.argv[2] || 'leads.csv';
  if (!fs.existsSync(leadsFile)) {
    console.error(\`Error: File '\${leadsFile}' not found. Please provide the path to your leads CSV.\`);
    process.exit(1);
  }

  const content = fs.readFileSync(leadsFile, 'utf8');
  const records = parse(content, {
    columns: true,
    skip_empty_lines: true
  });

  const emails = records.map((r: any) => r.email || r.Email).filter(Boolean);
  console.log(\`Found \${emails.length} total leads. Starting send...\`);

  // Resend has rate limits. We'll send in batches of 100.
  const batchSize = 100;
  for (let i = 0; i < emails.length; i += batchSize) {
    const batch = emails.slice(i, i + batchSize);
    console.log(\`Sending batch \${i / batchSize + 1}...\`);
    await sendBatch(batch);
    // Sleep to avoid rate limits if needed (Resend is quite generous but 40k is big)
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  console.log('Sending complete!');
}

run().catch(console.error);
