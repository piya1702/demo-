import React, { useState } from 'react';
import { Search as SearchIcon, MapPin, Star, X, Map as MapIcon, Image as ImageIcon, IndianRupee, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { generateStops } from '../utils/itineraryGenerator';

const MAP_PLACEHOLDER = 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800'; // Dark abstract map styling

const MOCK_CITIES = [
  { 
    id: 1, name: 'Tokyo, Japan', desc: 'Neon lights and ancient temples', rating: 4.9, 
    img: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80', 
    photos: [
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1542051842920-c7ba71112e2a?auto=format&fit=crop&w=400&q=80'
    ],
    mapUrl: MAP_PLACEHOLDER,
    budgetTracker: [
      { category: 'Flights (Round Trip)', amount: 65000 },
      { category: 'Accommodation (4 Nights)', amount: 40000 },
      { category: 'Food & Dining', amount: 18000 }
    ],
    itinerary: [
      { day: 1, title: 'Shibuya & Harajuku', desc: 'Experience the famous crossing and modern youth culture.' },
      { day: 2, title: 'Asakusa & Senso-ji', desc: 'Visit ancient temples and try street food along Nakamise.' },
      { day: 3, title: 'Tsukiji Market & Ginza', desc: 'Fresh sushi breakfast followed by high-end shopping.' }
    ]
  },
  { 
    id: 2, name: 'Paris, France', desc: 'The city of love and lights', rating: 4.8, 
    img: 'https://images.unsplash.com/photo-1502602868623-fb918a562483?auto=format&fit=crop&w=800&q=80', 
    photos: [
      'https://images.unsplash.com/photo-1431274151436-f8e14b2d1840?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=400&q=80'
    ],
    mapUrl: MAP_PLACEHOLDER,
    budgetTracker: [
      { category: 'Flights (Round Trip)', amount: 55000 },
      { category: 'Accommodation (4 Nights)', amount: 45000 },
      { category: 'Food & Dining', amount: 25000 }
    ],
    itinerary: [
      { day: 1, title: 'Eiffel & Seine River', desc: 'Climb the tower and enjoy a sunset cruise.' },
      { day: 2, title: 'Louvre & Champs-Élysées', desc: 'Mona Lisa viewing and premium shopping streets.' },
      { day: 3, title: 'Montmartre District', desc: 'Artistic vibes, cafes, and breathtaking views.' }
    ]
  },
  { 
    id: 3, name: 'New York City, USA', desc: 'The city that never sleeps', rating: 4.7, 
    img: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=80', 
    photos: [
      'https://images.unsplash.com/photo-1534430480872-3498386e7856?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1500916434205-0c77489c6cf7?auto=format&fit=crop&w=400&q=80'
    ],
    mapUrl: MAP_PLACEHOLDER,
    budgetTracker: [
      { category: 'Flights (Round Trip)', amount: 80000 },
      { category: 'Accommodation (4 Nights)', amount: 60000 },
      { category: 'Food & Dining', amount: 30000 }
    ],
    itinerary: [
      { day: 1, title: 'Times Square & Broadway', desc: 'Neon lights and world-class theatrical performance.' },
      { day: 2, title: 'Central Park & Museums', desc: 'Relax in the park and visit the MET or MoMA.' },
      { day: 3, title: 'Statue of Liberty & DUMBO', desc: 'Historic ferry ride and walking the Brooklyn Bridge.' }
    ]
  },
  { 
    id: 4, name: 'Rome, Italy', desc: 'Ancient history and culture', rating: 4.8, 
    img: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80', 
    photos: [
      'https://images.unsplash.com/photo-1531572753322-ad063cecc140?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1515542622106-78b28af872ec?auto=format&fit=crop&w=400&q=80'
    ],
    mapUrl: MAP_PLACEHOLDER,
    budgetTracker: [
      { category: 'Flights (Round Trip)', amount: 58000 },
      { category: 'Accommodation (4 Nights)', amount: 35000 },
      { category: 'Food & Dining', amount: 20000 }
    ],
    itinerary: [
      { day: 1, title: 'Colosseum & Roman Forum', desc: 'Step back into gladiator history and ancient ruins.' },
      { day: 2, title: 'Vatican City', desc: 'Sistine Chapel and St Peter\'s Basilica tour.' },
      { day: 3, title: 'Pantheon & Trevi Fountain', desc: 'Classic architecture and famous coin tossing.' }
    ]
  },
  { 
    id: 5, name: 'Kerala, India', desc: 'God\'s Own Country', rating: 4.9, 
    img: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80', 
    photos: [
      'https://images.unsplash.com/photo-1593693411515-c20261bcad6e?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=400&q=80'
    ],
    mapUrl: MAP_PLACEHOLDER,
    budgetTracker: [
      { category: 'Domestic Flights', amount: 15000 },
      { category: 'Houseboat & Resorts (4 Nights)', amount: 25000 },
      { category: 'Food & Local Travel', amount: 10000 }
    ],
    itinerary: [
      { day: 1, title: 'Munnar Tea Gardens', desc: 'Scenic rolling hills and fresh mountain breeze.' },
      { day: 2, title: 'Alleppey Backwaters', desc: 'Cruise and overnight stay on a traditional houseboat.' },
      { day: 3, title: 'Kochi Heritage Walk', desc: 'Explore Fort Kochi and the Chinese fishing nets.' }
    ]
  },
  { 
    id: 6, name: 'Rajasthan, India', desc: 'Land of Kings and majestic forts', rating: 4.8, 
    img: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=800&q=80', 
    photos: [
      'https://images.unsplash.com/photo-1598322314647-7977baeeedea?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=400&q=80'
    ],
    mapUrl: MAP_PLACEHOLDER,
    budgetTracker: [
      { category: 'Travel/Train', amount: 8000 },
      { category: 'Heritage Hotels (4 Nights)', amount: 30000 },
      { category: 'Fort Entry & Dining', amount: 12000 }
    ],
    itinerary: [
      { day: 1, title: 'Jaipur Pink City Tour', desc: 'Amer Fort, Hawa Mahal, and local bazaars.' },
      { day: 2, title: 'Udaipur City of Lakes', desc: 'Romantic boat ride on Lake Pichola.' },
      { day: 3, title: 'Jaisalmer Desert', desc: 'Golden fort and evening camel safari on sand dunes.' }
    ]
  },
  { 
    id: 7, name: 'Goa, India', desc: 'Sun, sand, and coastal paradise', rating: 4.7, 
    img: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80', 
    photos: [
      'https://images.unsplash.com/photo-1526761122248-c31c93f8b2d9?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1587922546307-776227941871?auto=format&fit=crop&w=400&q=80'
    ],
    mapUrl: MAP_PLACEHOLDER,
    budgetTracker: [
      { category: 'Domestic Flights', amount: 12000 },
      { category: 'Beach Resorts (4 Nights)', amount: 20000 },
      { category: 'Seafood & Nightlife', amount: 15000 }
    ],
    itinerary: [
      { day: 1, title: 'North Goa Beaches', desc: 'Baga and Anjuna beach hopping and shacks.' },
      { day: 2, title: 'Old Goa Heritage', desc: 'Basilica of Bom Jesus and Portuguese architecture.' },
      { day: 3, title: 'Dudhsagar & Spice Farms', desc: 'Lush greenery and spectacular waterfall trek.' }
    ]
  },
  { 
    id: 8, name: 'Bali, Indonesia', desc: 'Tropical paradise and serene temples', rating: 4.8, 
    img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80', 
    photos: [
      'https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=400&q=80'
    ],
    mapUrl: MAP_PLACEHOLDER,
    budgetTracker: [
      { category: 'Flights (Round Trip)', amount: 45000 },
      { category: 'Villa Stay (4 Nights)', amount: 35000 },
      { category: 'Food, Spas & Transport', amount: 20000 }
    ],
    itinerary: [
      { day: 1, title: 'Ubud Rice Terraces', desc: 'Monkey forest and iconic Tegallalang terraces.' },
      { day: 2, title: 'Uluwatu Temple', desc: 'Cliffside ocean views and Kecak fire dance.' },
      { day: 3, title: 'Seminyak Leisure', desc: 'Beach clubs, surfing, and sunset relaxation.' }
    ]
  }
];

const CitySearch = () => {
  const [query, setQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState(null);
  const navigate = useNavigate();

  let filtered = MOCK_CITIES.filter(c => c.name.toLowerCase().includes(query.toLowerCase()));

  // Dynamic Fallback: If user types a state not in DB, magic generate it!
  const hasExactMatch = MOCK_CITIES.some(c => c.name.toLowerCase() === query.toLowerCase());
  if (query.trim().length > 2 && !hasExactMatch && filtered.length === 0) {
    const customStops = generateStops(query, 3);
    const dynamicItin = customStops && customStops[0] && customStops[0].dailyPlan 
        ? customStops[0].dailyPlan 
        : [ { dayNumber: 1, title: 'Explore Center', desc: 'Sightseeing' } ];

    // Normalize for the loop below
    const normalizedItin = dynamicItin.map(d => ({
       day: d.dayNumber,
       title: d.title,
       desc: d.desc
    }));

    const safeSeed = encodeURIComponent(query.trim());
    filtered = [{
      id: 'custom-1', 
      name: query, 
      desc: `Explore the hidden gems of ${query}`, 
      rating: 4.5,
      // Using picsum to generate a guaranteed high quality random landscape based on their search string
      img: `https://picsum.photos/seed/${safeSeed}/800/600`, 
      photos: [
        `https://picsum.photos/seed/${safeSeed}1/400/400`,
        `https://picsum.photos/seed/${safeSeed}2/400/400`
      ],
      mapUrl: MAP_PLACEHOLDER,
      budgetTracker: [
        { category: 'Travel', amount: 20000 },
        { category: 'Accommodation', amount: 15000 },
        { category: 'Food & Activities', amount: 10000 }
      ],
      itinerary: normalizedItin
    }];
  }

  // Calculate generic total Budget for UI
  const getTotalBudget = (city) => city.budgetTracker.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="animate-fade-in container">
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Discover Destinations</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Find the perfect places to add to your itinerary.</p>
        
        <div style={{ position: 'relative', maxWidth: '600px', margin: '2rem auto 0' }}>
          <SearchIcon style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            className="input-field" 
            style={{ paddingLeft: '3rem', fontSize: '1.1rem', borderRadius: 'var(--radius-full)' }} 
            placeholder="Search by city, country, or region..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
        {filtered.map(city => (
          <div key={city.id} className="glass-card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ height: '200px', background: `url(${city.img}) center/cover` }} />
            <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h3 style={{ fontSize: '1.25rem' }}>{city.name}</h3>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#fbbf24', fontSize: '0.9rem' }}>
                  <Star size={14} fill="#fbbf24" /> {city.rating}
                </span>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem', flex: 1 }}>{city.desc}</p>
              
              <button className="btn btn-secondary" style={{ width: '100%' }} onClick={() => setSelectedCity(city)}>
                <MapPin size={16} /> View guide preview
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Massive Destination Dashboard Modal */}
      {selectedCity && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0, 0, 0, 0.8)', backdropFilter: 'blur(8px)',
          zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '2rem'
        }} onClick={() => setSelectedCity(null)}>
          
          <div className="glass-card animate-fade-in" style={{
            width: '100%', maxWidth: '900px', maxHeight: '90vh', background: 'var(--bg-dark)',
            overflowY: 'auto', display: 'flex', flexDirection: 'column'
          }} onClick={e => e.stopPropagation()}>
            
            {/* Header Banner */}
            <div style={{ height: '250px', background: `linear-gradient(to top, var(--bg-darker) 0%, transparent 100%), url(${selectedCity.img}) center/cover`, position: 'relative', display: 'flex', alignItems: 'flex-end', padding: '2rem' }}>
              <button 
                onClick={() => setSelectedCity(null)}
                style={{ position: 'absolute', top: '15px', right: '15px', background: 'rgba(0,0,0,0.5)', border: 'none', color: 'white', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'background 0.2s' }}>
                <X size={24} />
              </button>
              
              <div style={{ zIndex: 1 }}>
                 <h1 style={{ fontSize: '3rem', margin: 0 }}>{selectedCity.name}</h1>
                 <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginTop: '0.5rem' }}>{selectedCity.desc}</p>
              </div>
            </div>

            <div style={{ padding: '2rem' }}>
               
               {/* Map & Photos Section */}
               <div style={{ marginBottom: '3rem' }}>
                 <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><ImageIcon size={20} color="var(--accent-teal)" /> Famous Places & Overview</h3>
                 <div style={{ display: 'grid', gridTemplateColumns: 'minmax(200px, 1fr) 2fr', gap: '1rem' }}>
                    {/* Photos Grid */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {selectedCity.photos.map((photoUrl, i) => (
                         <div key={i} style={{ height: '140px', background: `url(${photoUrl}) center/cover`, borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}></div>
                      ))}
                    </div>
                    {/* Map Embed */}
                    <div style={{ borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', overflow: 'hidden', height: '100%' }}>
                      <iframe 
                        width="100%" 
                        height="100%" 
                        style={{ border: 0 }}
                        loading="lazy" 
                        allowFullScreen 
                        referrerPolicy="no-referrer-when-downgrade"
                        src={`https://maps.google.com/maps?q=${encodeURIComponent(selectedCity.name)}&t=&z=12&ie=UTF8&iwloc=&output=embed`}>
                      </iframe>
                    </div>
                 </div>
               </div>

               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
                 {/* Itinerary Preview */}
                 <div>
                   <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Clock size={20} color="var(--accent-teal)" /> Suggested Itinerary</h3>
                   <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', borderLeft: '2px solid var(--border-light)', paddingLeft: '1.5rem', marginLeft: '0.5rem' }}>
                     {selectedCity.itinerary.map((day) => (
                        <div key={day.day} style={{ position: 'relative' }}>
                           <div style={{ position: 'absolute', left: '-29px', top: '0', width: '12px', height: '12px', borderRadius: '50%', background: 'var(--accent-teal)' }}></div>
                           <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Day {day.day}: {day.title}</h4>
                           <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{day.desc}</p>
                        </div>
                     ))}
                   </div>
                 </div>

                 {/* Budget Preview */}
                 <div>
                   <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><IndianRupee size={20} color="var(--accent-teal)" /> Expected Budget</h3>
                   
                   <div style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '1.5rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center' }}>
                     <IndianRupee size={28} style={{ marginRight: '4px', color: 'var(--accent-teal)' }} />
                     {getTotalBudget(selectedCity).toLocaleString('en-IN')} <span style={{fontSize: '1rem', color: 'var(--text-muted)', marginLeft: '0.5rem', fontWeight: '400'}}>/avg total</span>
                   </div>

                   <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                     {selectedCity.budgetTracker.map((cat, i) => (
                       <div key={i} className="glass-card" style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ color: 'var(--text-secondary)' }}>{cat.category}</span>
                          <span style={{ fontWeight: '600', display: 'flex', alignItems: 'center' }}>
                            <IndianRupee size={14} />{cat.amount.toLocaleString('en-IN')}
                          </span>
                       </div>
                     ))}
                   </div>
                 </div>
               </div>

              {/* Action Button */}
              <div style={{ marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-light)', display: 'flex', justifyContent: 'center' }}>
                <button className="btn btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.1rem' }} onClick={() => navigate('/trips/new')}>
                  Start Building Your "{selectedCity.name}" Trip
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CitySearch;
