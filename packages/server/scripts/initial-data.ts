import { ObjectId, ObjectID } from 'bson';
import { createHash } from 'crypto';

export interface SeedPizza {
  _id: ObjectID;
  name: string;
  description: string;
  toppingIds: ObjectID[];
  imgSrc: string;
  updatedAt: string;
  createdAt: string;
}

export interface SeedTopping {
  _id: ObjectID;
  name: string;
  priceCents: number;
  updatedAt: string;
  createdAt: string;
}

const deterministicId = (data: string): ObjectId => {
  const hash = createHash('sha1').update(data).digest('hex').slice(0, 24);

  return new ObjectId(hash);
};

const ID = {
  TomatoSauce: deterministicId('Tomato Sauce'),
  BBQSauce: deterministicId('BBQ Sauce'),
  SweetSauce: deterministicId('Sweet Sauce'),
  Mozzarella: deterministicId('Mozzarella'),
  Swiss: deterministicId('Swiss'),
  Provolone: deterministicId('Provolone'),
  Cheddar: deterministicId('Cheddar'),
  Parmesan: deterministicId('Parmesan'),
  Goat: deterministicId('Goat'),
  Pepperoni: deterministicId('Pepperoni'),
  Ham: deterministicId('Ham'),
  Bacon: deterministicId('Bacon'),
  Chicken: deterministicId('Chicken'),
  Anchovy: deterministicId('Anchovy'),
  Tuna: deterministicId('Tuna'),
  GreenPeppers: deterministicId('Green Peppers'),
  RedOnion: deterministicId('Red Onion'),
  Mushrooms: deterministicId('Mushrooms'),
  Olives: deterministicId('Olives'),
  Tomatoes: deterministicId('Tomatoes'),
  Basil: deterministicId('Basil'),
  Pesto: deterministicId('Pesto'),
  Pineapple: deterministicId('Pineapple'),
  Jalapeno: deterministicId('Jalapeno'),
  Pickles: deterministicId('Pickles'),
  Honey: deterministicId('Honey'),
  Donair: deterministicId('Donair'),
};

export const pizzas: SeedPizza[] = [
  {
    _id: deterministicId('Cheese'),
    name: 'Cheese',
    description: 'Simple',
    toppingIds: [ID.TomatoSauce, ID.Mozzarella],
    imgSrc:
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80',
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    _id: deterministicId('Three-Cheese'),
    name: 'Three-Cheese',
    description: '3x the cheese',
    toppingIds: [ID.TomatoSauce, ID.Mozzarella, ID.Provolone, ID.Cheddar],
    imgSrc:
      'https://images.unsplash.com/photo-1548369937-47519962c11a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    _id: deterministicId('4-maggi'),
    name: '4-maggi',
    description: 'Even more cheese',
    toppingIds: [ID.Mozzarella, ID.Provolone, ID.Cheddar, ID.Parmesan, ID.Honey],
    imgSrc:
      'https://cdn.shopify.com/s/files/1/0503/0523/7143/files/4_7f96f01f-e49e-41ca-8556-b853c2f03d4b_480x480.jpg?v=1610182442',
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    _id: deterministicId('Margherita'),
    name: 'Margherita',
    description: 'An Italian Classic',
    toppingIds: [ID.TomatoSauce, ID.Mozzarella, ID.Basil],
    imgSrc:
      'https://images.unsplash.com/photo-1627626775846-122b778965ae?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',

    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    _id: deterministicId('Pepperoni'),
    name: 'Pepperoni',
    description: 'A Brooklyn Staple',
    toppingIds: [ID.TomatoSauce, ID.Mozzarella, ID.Pepperoni],
    imgSrc:
      'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGNoZWVzZSUyMHBpenphfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',

    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    _id: deterministicId('Hawaiian'),
    name: 'Hawaiian',
    description: 'Why would you order this',
    toppingIds: [ID.TomatoSauce, ID.Mozzarella, ID.Ham, ID.Pineapple],
    imgSrc:
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=828&q=80',

    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    _id: deterministicId('Donair'),
    name: 'Donair',
    description: 'A Halifax Classic',
    toppingIds: [ID.TomatoSauce, ID.Mozzarella, ID.RedOnion, ID.Tomatoes, ID.Donair, ID.SweetSauce],
    imgSrc:
      'https://images.unsplash.com/photo-1511091252864-6d6841e35878?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTB8fGNoZWVzZSUyMHBpenphfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',

    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    _id: deterministicId('Deluxe'),
    name: 'Deluxe',
    description: 'Simple but classic toppingIds',
    toppingIds: [ID.TomatoSauce, ID.Mozzarella, ID.Pepperoni, ID.GreenPeppers, ID.RedOnion, ID.Mushrooms, ID.Olives],
    imgSrc:
      'https://images.unsplash.com/photo-1595708684082-a173bb3a06c5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1490&q=80',

    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    _id: deterministicId('Vegetarian'),
    name: 'Vegetarian',
    description: 'The deluxe with less dead animals',
    toppingIds: [ID.TomatoSauce, ID.Mozzarella, ID.GreenPeppers, ID.RedOnion, ID.Mushrooms, ID.Olives],
    imgSrc:
      'https://images.unsplash.com/photo-1604917877934-07d8d248d396?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',

    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    _id: deterministicId('Meateater'),
    name: 'Meateater',
    description: 'The deluxe but with more dead animals',
    toppingIds: [ID.TomatoSauce, ID.Mozzarella, ID.Pepperoni, ID.Ham, ID.Bacon],
    imgSrc:
      'https://images.unsplash.com/photo-1600346019001-8d56d1b51d59?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjJ8fGNoZWVzZSUyMHBpenphfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',

    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    _id: deterministicId('The Works'),
    name: 'The Works',
    description: 'A lil bit of everything',
    toppingIds: [
      ID.TomatoSauce,
      ID.Mozzarella,
      ID.Pepperoni,
      ID.GreenPeppers,
      ID.RedOnion,
      ID.Mushrooms,
      ID.Olives,
      ID.Jalapeno,
      ID.Chicken,
    ],
    imgSrc:
      'https://images.unsplash.com/photo-1559978137-8c560d91e9e1?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjd8fGNoZWVzZSUyMHBpenphfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',

    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    _id: deterministicId('The Works (but actually this time)'),
    name: 'The Works (but actually this time)',
    description: 'A lot of everything',
    toppingIds: [
      ID.TomatoSauce,
      ID.BBQSauce,
      ID.Mozzarella,
      ID.Provolone,
      ID.Cheddar,
      ID.Parmesan,
      ID.Goat,
      ID.Pepperoni,
      ID.Ham,
      ID.Bacon,
      ID.Anchovy,
      ID.GreenPeppers,
      ID.RedOnion,
      ID.Mushrooms,
      ID.Olives,
      ID.Tomatoes,
      ID.Basil,
      ID.Pesto,
      ID.Pineapple,
      ID.Jalapeno,
      ID.Pickles,
      ID.Honey,
      ID.Donair,
      ID.Chicken,
    ],
    imgSrc:
      'https://images.unsplash.com/photo-1528490060256-c345efae4442?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjh8fGNoZWVzZSUyMHBpenphfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',

    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    _id: deterministicId('BBQ Chicken'),
    name: 'BBQ Chicken',
    description: "Straight from Jones'' BBQ & foot massage",
    toppingIds: [ID.TomatoSauce, ID.BBQSauce, ID.Mozzarella, ID.Bacon, ID.Chicken],
    imgSrc:
      'https://images.unsplash.com/photo-1596458397260-255807e979f1?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjV8fGNoZWVzZSUyMHBpenphfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',

    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    _id: deterministicId('Chicken Pesto'),
    name: 'Chicken Pesto',
    description: '',
    toppingIds: [ID.TomatoSauce, ID.Mozzarella, ID.RedOnion, ID.Pesto, ID.Chicken],
    imgSrc:
      'https://images.unsplash.com/photo-1576458087875-4d52fc51e013?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzB8fGNoZWVzZSUyMHBpenphfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',

    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    _id: deterministicId('Belt Line'),
    name: 'Belt Line',
    description: 'A calgary classic',
    toppingIds: [
      ID.TomatoSauce,
      ID.Mozzarella,
      ID.Provolone,
      ID.Bacon,
      ID.RedOnion,
      ID.Mushrooms,
      ID.Jalapeno,
      ID.Donair,
    ],
    imgSrc:
      'https://images.unsplash.com/photo-1536090219743-b4d977a0d9f2?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTV8fGNoZWVzZSUyMHBpenphfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',

    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    _id: deterministicId('Pickle'),
    name: 'Pickle',
    description: 'This is even worse then the Hawaiian, whats wrong with you people',
    toppingIds: [ID.TomatoSauce, ID.Mozzarella, ID.Pickles],
    imgSrc:
      'https://images.unsplash.com/photo-1620374643809-b69c702d0ed4?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzZ8fGNoZWVzZSUyMHBpenphfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',

    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
];

export const toppings: SeedTopping[] = [
  {
    _id: ID.TomatoSauce,
    name: 'Tomato Sauce',
    priceCents: 250,
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    _id: ID.BBQSauce,
    name: 'BBQ Sauce',
    priceCents: 250,
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    _id: ID.Mozzarella,
    name: 'Mozzarella',
    priceCents: 200,
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    _id: ID.Swiss,
    name: 'Swiss',
    priceCents: 200,
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    _id: ID.Provolone,
    name: 'Provolone',
    priceCents: 200,
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    _id: ID.Cheddar,
    name: 'Cheddar',
    priceCents: 200,
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    _id: ID.Parmesan,
    name: 'Parmesan',
    priceCents: 200,
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    _id: ID.Goat,
    name: 'Goat',
    priceCents: 200,
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    _id: ID.Pepperoni,
    name: 'Pepperoni',
    priceCents: 300,
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    _id: ID.Ham,
    name: 'Ham',
    priceCents: 300,
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    _id: ID.Bacon,
    name: 'Bacon',
    priceCents: 300,
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    _id: ID.Anchovy,
    name: 'Anchovy',
    priceCents: 300,
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    _id: ID.Tuna,
    name: 'Tuna',
    priceCents: 2500,
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    _id: ID.GreenPeppers,
    name: 'Green Peppers',
    priceCents: 100,
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    _id: ID.RedOnion,
    name: 'Red Onion',
    priceCents: 100,
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    _id: ID.Mushrooms,
    name: 'Mushrooms',
    priceCents: 100,
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    _id: ID.Olives,
    name: 'Olives',
    priceCents: 100,
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    _id: ID.Tomatoes,
    name: 'Tomatoes',
    priceCents: 100,
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    _id: ID.Basil,
    name: 'Basil',
    priceCents: 100,
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    _id: ID.Pesto,
    name: 'Pesto',
    priceCents: 100,
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    _id: ID.Pineapple,
    name: 'Pineapple',
    priceCents: 400,
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    _id: ID.Jalapeno,
    name: 'Jalapeno',
    priceCents: 400,
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    _id: ID.Pickles,
    name: 'Pickles',
    priceCents: 400,
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    _id: ID.Honey,
    name: 'Honey',
    priceCents: 400,
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    _id: ID.Donair,
    name: 'Donair',
    priceCents: 400,
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    _id: ID.SweetSauce,
    name: 'Sweet Sauce',
    priceCents: 400,
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
];
