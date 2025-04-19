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

    const recentProducts = products
      .filter(p => p.id !== params.excludeId) 
      .slice(-5); 

    return NextResponse.json(recentProducts);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch recent products" },
      { status: 500 }
    );
  }
}