#!/usr/bin/env bash
set -euo pipefail
rm -rf voiceover webbyelie-polly-voiceover.tar
mkdir -p voiceover
aws polly synthesize-speech --region 'us-east-2' --engine 'standard' --voice-id 'Salli' --output-format mp3 --text 'A website refresh does not have to mean starting over.' 'voiceover/01-hero-01-female.mp3'
aws polly synthesize-speech --region 'us-east-2' --engine 'standard' --voice-id 'Kendra' --output-format mp3 --text 'Right. The goal is a sharper web presence: better looking, easier to find, and less wasteful to run.' 'voiceover/01-hero-02-male.mp3'
aws polly synthesize-speech --region 'us-east-2' --engine 'standard' --voice-id 'Kendra' --output-format mp3 --text 'This starts with decades of software engineering judgment.' 'voiceover/02-intro-01-male.mp3'
aws polly synthesize-speech --region 'us-east-2' --engine 'standard' --voice-id 'Salli' --output-format mp3 --text 'Yes, and that means looking past the surface: structure, maintainability, search signals, tool choices, and costs.' 'voiceover/02-intro-02-female.mp3'
aws polly synthesize-speech --region 'us-east-2' --engine 'standard' --voice-id 'Salli' --output-format mp3 --text 'Most independent businesses have already put real work into their current website.' 'voiceover/03-problem-01-female.mp3'
aws polly synthesize-speech --region 'us-east-2' --engine 'standard' --voice-id 'Kendra' --output-format mp3 --text 'Exactly. But over time, the look can age, search signals can weaken, AI clarity can fade, and recurring costs can pile up quietly.' 'voiceover/03-problem-02-male.mp3'
aws polly synthesize-speech --region 'us-east-2' --engine 'standard' --voice-id 'Kendra' --output-format mp3 --text 'The work follows a practical checklist.' 'voiceover/04-passes-01-male.mp3'
aws polly synthesize-speech --region 'us-east-2' --engine 'standard' --voice-id 'Salli' --output-format mp3 --text 'Right: refresh the look, improve search, make the site AI-ready, and clean up unnecessary spend.' 'voiceover/04-passes-02-female.mp3'
aws polly synthesize-speech --region 'us-east-2' --engine 'standard' --voice-id 'Salli' --output-format mp3 --text 'Instead of guessing from abstract design ideas, we compare real visual directions.' 'voiceover/05-refresh-01-female.mp3'
aws polly synthesize-speech --region 'us-east-2' --engine 'standard' --voice-id 'Kendra' --output-format mp3 --text 'Yes. Real options make the choice easier, preserve useful existing work, and give everyone a clear sign-off direction.' 'voiceover/05-refresh-02-male.mp3'
aws polly synthesize-speech --region 'us-east-2' --engine 'standard' --voice-id 'Kendra' --output-format mp3 --text 'Search Engine Optimization is precise. Search engines read visible content and behind-the-scenes details.' 'voiceover/06-search-01-male.mp3'
aws polly synthesize-speech --region 'us-east-2' --engine 'standard' --voice-id 'Salli' --output-format mp3 --text 'Exactly: titles, headings, links, service wording, locations, and image labels each help the site explain itself clearly.' 'voiceover/06-search-02-female.mp3'
aws polly synthesize-speech --region 'us-east-2' --engine 'standard' --voice-id 'Salli' --output-format mp3 --text 'Today, many searches begin in chat boxes and AI assistants, not only search engines.' 'voiceover/07-ai-01-female.mp3'
aws polly synthesize-speech --region 'us-east-2' --engine 'standard' --voice-id 'Kendra' --output-format mp3 --text 'Right. AI systems look for clear facts: who you are, what you do, where you work, which services matter, and what answer you provide.' 'voiceover/07-ai-02-male.mp3'
aws polly synthesize-speech --region 'us-east-2' --engine 'standard' --voice-id 'Kendra' --output-format mp3 --text 'Then there are the small bills: domains, hosting, plugins, email add-ons, booking tools, analytics, and image tools.' 'voiceover/08-cost-01-male.mp3'
aws polly synthesize-speech --region 'us-east-2' --engine 'standard' --voice-id 'Salli' --output-format mp3 --text 'Yes. Some are essential. Some overlap. Some renew because nobody has looked at them in years.' 'voiceover/08-cost-02-female.mp3'
aws polly synthesize-speech --region 'us-east-2' --engine 'standard' --voice-id 'Salli' --output-format mp3 --text 'The process starts with a short intake conversation.' 'voiceover/09-work-01-female.mp3'
aws polly synthesize-speech --region 'us-east-2' --engine 'standard' --voice-id 'Kendra' --output-format mp3 --text 'Right. What is already working? What should be preserved? Where are visitors getting stuck?' 'voiceover/09-work-02-male.mp3'
aws polly synthesize-speech --region 'us-east-2' --engine 'standard' --voice-id 'Kendra' --output-format mp3 --text 'Work begins with a practical initial bundle, usually around ten hours.' 'voiceover/10-retainer-01-male.mp3'
aws polly synthesize-speech --region 'us-east-2' --engine 'standard' --voice-id 'Salli' --output-format mp3 --text 'Exactly. Progress is tracked clearly, with notes on what changed and a warning when the budget reaches halfway.' 'voiceover/10-retainer-02-female.mp3'
aws polly synthesize-speech --region 'us-east-2' --engine 'standard' --voice-id 'Salli' --output-format mp3 --text 'Send the link.' 'voiceover/11-cta-01-female.mp3'
aws polly synthesize-speech --region 'us-east-2' --engine 'standard' --voice-id 'Kendra' --output-format mp3 --text 'Yes. Get the first pass. A clearer site starts with knowing what is already there.' 'voiceover/11-cta-02-male.mp3'
tar -cf webbyelie-polly-voiceover.tar voiceover
ls -lh webbyelie-polly-voiceover.tar
