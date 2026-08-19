import { NextResponse } from 'next/server';
import { dummyContacts } from '@/data/contacts';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.toLowerCase() || '';

  if (!query) {
    return NextResponse.json({ results: dummyContacts });
  }

  const queryTerms = query.split(' ').filter(t => t.length > 0);

  const results = dummyContacts.filter(contact => {
    // Simple naive matching for MVP
    const searchableString = [
      contact.name,
      contact.nameSinhala,
      contact.nameTamil,
      contact.department,
      contact.location,
      contact.type,
      ...contact.keywords
    ].join(' ').toLowerCase();

    return queryTerms.some(term => searchableString.includes(term));
  });

  return NextResponse.json({ results });
}
