import { NextResponse } from 'next/server';
import { dummyContacts } from '@/data/contacts';

export async function POST(request: Request) {
  try {
    const { query } = await request.json();
    if (!query) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    const queryTerms = query.toLowerCase().split(' ').filter((t: string) => t.length > 0);
    
    // Naive matching for the Copilot MVP
    const scoredContacts = dummyContacts.map(contact => {
      const searchableString = [
        contact.name,
        contact.nameSinhala,
        contact.nameTamil,
        contact.department,
        contact.location,
        contact.type,
        ...contact.keywords
      ].join(' ').toLowerCase();
      
      let score = 0;
      queryTerms.forEach((term: string) => {
        if (searchableString.includes(term)) {
          score += 1;
        }
      });
      
      return { contact, score };
    }).filter(c => c.score > 0)
    .sort((a, b) => b.score - a.score);

    if (scoredContacts.length === 0) {
      return NextResponse.json({
        match: null,
        confidence: 0,
        summary: "I couldn't find any direct matches for your query in the directory. Try rephrasing or checking the exact name."
      });
    }

    const bestMatch = scoredContacts[0].contact;
    // Calculate a fake confidence score based on keyword hit ratio (capped at 99%)
    const confidence = Math.min(Math.round((scoredContacts[0].score / queryTerms.length) * 100), 99);
    
    return NextResponse.json({
      match: bestMatch,
      confidence: Math.max(confidence, 40), // min 40% if there is any match
      summary: `Retrieved direct lines for ${bestMatch.type} - ${bestMatch.name}.`
    });

  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
