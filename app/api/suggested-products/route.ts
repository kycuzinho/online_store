import { NextResponse } from 'next/server';
import getProducts from '@/actions/getProducts';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  const params = {
    category: searchParams.get('category') || undefined,
    excludeId: searchParams.get('excludeId') || undefined,
  };

  try {
    const products = await getProducts(params);
    const filtered = products.filter(p => p.id !== params.excludeId).slice(0, 4);
    return NextResponse.json(filtered);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch suggested products" },
      { status: 500 }
    );
  }
}