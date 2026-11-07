// All editable pub content lives in this file.
// Anything marked TODO is placeholder content that should be replaced with the real details.

export const pub = {
  name: 'The Green Hill Tavern',
  street: '14 High Street',
  town: 'Ridden',
  postcode: 'RD1 4XX',
  country: 'England',
  // TODO: real phone number (also update index.html JSON-LD)
  phone: '01234 567890',
  phoneHref: 'tel:+441234567890',
  // TODO: real bookings email (also update index.html JSON-LD)
  email: 'hello@thegreenhilltavern.co.uk',
  // TODO: real year the pub opened / building dates from
  established: '1838',
  // TODO: real social profile URLs
  social: {
    facebook: 'https://www.facebook.com/',
    instagram: 'https://www.instagram.com/',
  },
  // TODO: replace with the "Embed a map" iframe src from Google Maps for the exact pin
  mapEmbed:
    'https://www.google.com/maps?q=14+High+Street,+Ridden,+RD1+4XX&output=embed',
  directions:
    'https://www.google.com/maps/dir/?api=1&destination=14+High+Street,+Ridden,+RD1+4XX',
}

// day: 0 = Sunday ... 6 = Saturday (matches Date.getDay())
// TODO: confirm opening and kitchen hours (also update index.html JSON-LD)
export const hours = [
  { day: 1, label: 'Monday', bar: ['12:00', '23:00'], kitchen: ['12:00', '20:30'] },
  { day: 2, label: 'Tuesday', bar: ['12:00', '23:00'], kitchen: ['12:00', '20:30'] },
  { day: 3, label: 'Wednesday', bar: ['12:00', '23:00'], kitchen: ['12:00', '20:30'] },
  { day: 4, label: 'Thursday', bar: ['12:00', '23:30'], kitchen: ['12:00', '20:30'] },
  { day: 5, label: 'Friday', bar: ['12:00', '00:30'], kitchen: ['12:00', '21:00'] },
  { day: 6, label: 'Saturday', bar: ['12:00', '00:30'], kitchen: ['12:00', '21:00'] },
  { day: 0, label: 'Sunday', bar: ['12:00', '22:30'], kitchen: ['12:00', '17:00'] },
]

// TODO: replace the whole menu with the current menu and prices
export const menu = [
  {
    id: 'mains',
    label: 'Pub Classics',
    note: 'Served Monday to Saturday, 12 till 8:30pm (9pm Fri & Sat).',
    items: [
      { name: 'Beer-Battered Haddock', desc: 'Line-caught haddock in our house bitter batter, triple-cooked chips, crushed minted peas, tartare sauce.', price: '16.50' },
      { name: 'Steak & Ale Pie', desc: 'Braised beef shin and stout under a hand-crimped shortcrust lid. Mash or chips, seasonal greens, proper gravy.', price: '17.00' },
      { name: 'Ham, Egg & Chips', desc: 'Honey and mustard roasted gammon, two free-range fried eggs, chips.', price: '14.50', tags: ['GF'] },
      { name: 'Bangers & Mash', desc: 'Three Lincolnshire sausages from the local butcher, buttery mash, onion gravy.', price: '14.00' },
      { name: '8oz Sirloin Steak', desc: '28-day aged, grilled to your liking, flat mushroom, roast tomato, chips. Peppercorn sauce +£2.50.', price: '26.00', tags: ['GF'] },
      { name: 'Wild Mushroom & Ale Pie', desc: 'Chestnut and wild mushrooms, leek and thyme in a rich ale gravy, mash or chips.', price: '15.00', tags: ['VG'] },
      { name: 'Ploughman’s', desc: 'Mature Cheddar, Stilton, pork pie, pickled onion, homemade piccalilli, crusty bread.', price: '13.50', tags: ['V option'] },
    ],
  },
  {
    id: 'roast',
    label: 'Sunday Roast',
    note: 'Sundays from 12 till 5pm, or until it’s gone. Booking strongly advised.',
    items: [
      { name: 'Topside of Beef', desc: 'Roasted pink, Yorkshire pudding, goose-fat roast potatoes, honey-glazed carrots, cauliflower cheese, greens, gravy.', price: '18.50' },
      { name: 'Roast Pork Belly', desc: 'Slow-roasted with crackling, apple sauce and all the trimmings.', price: '17.50' },
      { name: 'Half Roast Chicken', desc: 'Lemon and thyme, sage and onion stuffing, pigs in blankets, all the trimmings.', price: '17.50' },
      { name: 'Nut Roast', desc: 'Chestnut, cranberry and squash, roasted in-house, with vegan gravy and all the trimmings.', price: '15.50', tags: ['VG'] },
      { name: 'Children’s Roast', desc: 'Any of the above, smaller portion, for under-12s.', price: '9.50' },
    ],
  },
  {
    id: 'lighter',
    label: 'Sandwiches & Lighter',
    note: 'Lunchtimes, Monday to Saturday, 12 till 3pm.',
    items: [
      { name: 'Fish Finger Doorstop', desc: 'Breaded haddock fingers, tartare, little gem, on thick white bloomer.', price: '9.50' },
      { name: 'Hot Roast Beef Bap', desc: 'Sliced topside, caramelised onions, horseradish, gravy for dunking.', price: '10.50' },
      { name: 'Cheddar & Pickle', desc: 'Mature Cheddar and house chutney on granary, with crisps.', price: '8.00', tags: ['V'] },
      { name: 'Soup of the Day', desc: 'Ask at the bar. Served with crusty bread and butter.', price: '7.00', tags: ['V'] },
      { name: 'Scotch Egg', desc: 'Still warm, runny yolk, with English mustard mayonnaise.', price: '6.50' },
    ],
  },
  {
    id: 'puddings',
    label: 'Puddings',
    note: 'All £7.50 unless marked.',
    items: [
      { name: 'Sticky Toffee Pudding', desc: 'Warm date sponge, toffee sauce, vanilla ice cream.', price: '7.50', tags: ['V'] },
      { name: 'Apple & Blackberry Crumble', desc: 'With hot custard or clotted cream.', price: '7.50', tags: ['V'] },
      { name: 'Treacle Tart', desc: 'Lemon zest, clotted cream.', price: '7.50', tags: ['V'] },
      { name: 'Local Cheeseboard', desc: 'Three English cheeses, crackers, grapes, chutney. Ask about a glass of port.', price: '10.00', tags: ['V'] },
    ],
  },
  {
    id: 'pumps',
    label: 'On the Pumps',
    note: 'Four rotating cask ales plus keg and cider. Prices per pint; halves and thirds available.',
    items: [
      { name: 'Green Hill Best', desc: 'Our house bitter. Copper, biscuity, gently hoppy. 3.8%', price: '4.40' },
      { name: 'Guest Golden Ale', desc: 'Something pale and citrusy from a small brewery within 30 miles. Ask what’s on.', price: '4.60' },
      { name: 'Dark Ruby Mild', desc: 'Chocolate, roasted malt, easy drinking. 3.6%', price: '4.20' },
      { name: 'Seasonal Guest', desc: 'Changes weekly. Check the chalkboard by the bar.', price: '4.70' },
      { name: 'Farmhouse Cider', desc: 'Still, dry and cloudy, from the barrel. 6.0%', price: '4.80' },
      { name: 'Stout', desc: 'Keg, poured properly and left to settle.', price: '5.20' },
    ],
  },
]

// TODO: confirm the weekly fixtures
export const regulars = [
  { day: 'Tuesday', title: 'Pool League', time: '8pm', desc: 'Home fixtures in the back room. Table free for everyone the rest of the week.' },
  { day: 'Wednesday', title: 'Pie & a Pint', time: 'All day', desc: 'Any pie and a pint of house ale for £18.' },
  { day: 'Thursday', title: 'Pub Quiz', time: '8:30pm', desc: 'Six rounds, teams of up to six, £1 a head. Cash jackpot rolls over weekly.' },
  { day: 'Saturday', title: 'Live Music', time: '9pm', desc: 'Local bands and acoustic acts in the front bar. Free entry.' },
  { day: 'Sunday', title: 'Roast & Meat Raffle', time: '12 till 5pm', desc: 'Roasts all afternoon, raffle drawn at 4pm in aid of a local charity.' },
]

// TODO: replace with real upcoming events (keep dates in ISO format YYYY-MM-DD)
export const upcoming = [
  { date: '2026-11-21', title: 'The Hollow Oaks', kind: 'Live music', desc: 'Four-piece folk and roots from just up the road. Fiddles likely.' },
  { date: '2026-11-27', title: 'Winter Ale Weekend', kind: 'Beer festival', desc: 'Twelve extra casks on stillage in the gazebo, Friday to Sunday. Hot food in the garden.' },
  { date: '2026-12-12', title: 'Christmas Jumper Night', kind: 'Live music', desc: 'Covers band, mulled cider at the bar, prize for the worst jumper.' },
  { date: '2026-12-24', title: 'Christmas Eve Quiz', kind: 'Quiz', desc: 'The big one. Double jackpot, mince pies on the tables.' },
  { date: '2026-12-31', title: 'New Year’s Eve', kind: 'Party', desc: 'DJ from 9pm until late, fizz at midnight. Ticketed, £10 including a drink.' },
]

export const gallery = [
  { src: '/images/exterior-front.webp', small: '/images/exterior-front-800.webp', w: 1448, h: 1086, alt: 'The front of the pub on a sunny day, hanging baskets of pink and white flowers above the bay windows and picnic benches outside' },
  { src: '/images/bar.webp', small: '/images/bar-800.webp', w: 1448, h: 1086, alt: 'The long pine-panelled bar with a row of hand pulls, glasses racked overhead and a red and black quarry-tiled floor' },
  { src: '/images/games-room.webp', small: '/images/games-room-800.webp', w: 1448, h: 1086, alt: 'The back room with a pool table, jukebox and black leather bench seating around the walls' },
  { src: '/images/exterior-corner.webp', small: '/images/exterior-corner-800.webp', w: 1560, h: 986, alt: 'The gable end of the pub at the corner of West Street, painted with the words The Greenhill Tavern Free House' },
  // TODO: add more photos (food, Sunday roast, beer garden, a busy quiz night). Put files in public/images.
]

// TODO: replace with real reviews (with permission) and the real rating
export const rating = { score: '4.6', count: '312', source: 'Google' }
export const reviews = [
  {
    quote: 'Best Sunday roast for miles. Yorkshires the size of your head, proper crispy potatoes, and they don’t skimp on the gravy. We’ve booked for every Sunday this month.',
    name: 'Helen M.',
    meta: 'Google review',
    featured: true,
  },
  { quote: 'Great pint of Best, friendly staff and the dog got a biscuit before we did. A real local.', name: 'Dave R.', meta: 'Google review' },
  { quote: 'Thursday quiz is brilliantly run. Hard enough to be fun, and the chips are worth coming for alone.', name: 'Priya S.', meta: 'Tripadvisor' },
]
