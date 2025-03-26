export const products = [
  {
    id: 'p1',
    name: 'Premium Headphones',
    description: 'High-quality wireless headphones with noise cancellation',
    originalPrice: 199,
    currentPrice: 89,
    stock: 2,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop',
    rating: 4.8,
    sales: 10000
  },
  {
    id: 'p2',
    name: 'Smart Watch',
    description: 'Feature-rich smartwatch with health tracking',
    originalPrice: 299,
    currentPrice: 149,
    stock: 5,
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=600&auto=format&fit=crop',
    rating: 4.6,
    sales: 8500
  }
];

export const upsellProducts = [
  {
    id: 'u1',
    name: 'Protection Plan',
    description: '2-year extended warranty',
    originalPrice: 29,
    currentPrice: 19,
    image: '/images/warranty.svg'
  },
  {
    id: 'u2',
    name: 'Fast Shipping',
    description: 'Next-day delivery guarantee',
    originalPrice: 15,
    currentPrice: 9.99,
    image: '/images/shipping.svg'
  }
];

export const premiumUpsellProducts = [
  {
    id: 'pu1',
    name: 'VIP Service Package',
    description: 'Premium support and priority service',
    originalPrice: 49,
    currentPrice: 39,
    image: '/images/vip.svg'
  },
  {
    id: 'pu2',
    name: 'Premium Gift Wrap',
    description: 'Luxury packaging with personalized message',
    originalPrice: 19,
    currentPrice: 14.99,
    image: '/images/gift.svg'
  }
];
