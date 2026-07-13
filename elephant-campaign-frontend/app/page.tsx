import React from 'react';
import Image from 'next/image';
import { Heart, Users, Share2, Compass, Eye, Footprints, Sparkles, Info } from 'lucide-react';
import VolunteerForm from '@/components/VolunteerForm';
import WhatsAppWidget from '@/components/WhatsAppWidget';

export default function ElephantCampaignLanding() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans selection:bg-emerald-200">
      
      {/* HEADER / NAVIGATION */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-emerald-800 text-lg tracking-tight hover:scale-[1.01] transition-transform duration-200">
            <span className="text-xl">🐘</span> <span>The Chain Free Project</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
            <a href="#about" className="hover:text-emerald-700 transition-colors duration-200">Our Ethos</a>
            <a href="#herd" className="hover:text-emerald-700 transition-colors duration-200">Meet the Herd</a>
            <a href="#experiences" className="hover:text-emerald-700 transition-colors duration-200">Experiences</a>
            <a href="#gallery" className="hover:text-emerald-700 transition-colors duration-200">Media Hub</a>
          </nav>
          <a 
            href="#volunteer" 
            className="bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow-md hover:scale-[1.03] active:scale-[0.98]"
          >
            Book Visit
          </a>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-br from-stone-950 via-stone-900 to-emerald-950 text-white py-28 md:py-36 px-4 overflow-hidden">
        {/* Floating gradient blur orbs for premium visual depth */}
        <div className="absolute top-12 left-1/4 w-72 h-72 rounded-full bg-emerald-500/10 blur-3xl animate-pulse duration-10000"></div>
        <div className="absolute bottom-8 right-1/4 w-96 h-96 rounded-full bg-emerald-700/5 blur-3xl animate-pulse duration-7000"></div>
        <div className="absolute inset-0 bg-[radial-gradient(#1f2e22_1px,transparent_1px)] [background-size:24px_24px] opacity-40"></div>
        
        <div className="relative max-w-4xl mx-auto text-center space-y-8 animate-fadeInUp">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-emerald-400" /> Ethical Sanctuary in Sauraha, Nepal
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.15]">
            Born to Rule the Wild Forests, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Not to Spend Life in Chains.</span>
          </h1>
          <p className="text-lg md:text-xl text-stone-300 max-w-2xl mx-auto font-light leading-relaxed">
            Welcome to a ride-free, chain-free haven. Meet our rescued elephants, walk alongside them in their natural river habitats, and help us fund a kinder future for Nepal&apos;s elephants.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <a 
              href="#volunteer" 
              className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-stone-950 font-bold px-8 py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-emerald-500/10 hover:scale-[1.03] active:scale-[0.98] text-center text-sm"
            >
              Book an Ethical Visit
            </a>
            <a 
              href="#volunteer" 
              className="bg-transparent hover:bg-white/5 text-white font-semibold border border-stone-600 hover:border-stone-400 px-8 py-4 rounded-lg transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] text-center text-sm"
            >
              Apply as a Volunteer
            </a>
          </div>
        </div>
      </section>

      {/* SANCTUARY ETHOS SECTION */}
      <section id="about" className="py-24 max-w-6xl mx-auto px-4">
        <div className="text-center space-y-2 mb-16">
          <span className="text-emerald-700 text-xs font-bold uppercase tracking-wider">Our Core Foundation</span>
          <h2 className="text-3xl font-bold text-stone-900 tracking-tight">The Sanctuary Ethos</h2>
          <div className="h-1 w-12 bg-emerald-600 mx-auto rounded mt-2"></div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-stone-200/80 shadow-sm hover:shadow-md hover:-translate-y-1.5 transition-all duration-300 space-y-4 animate-fadeInUp">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-stone-900">100% Ride-Free & Chain-Free</h3>
            <p className="text-stone-600 text-sm leading-relaxed">
              We stand firmly against tourist elephant riding and chains. Our herd spends their days grazing, bathing, and socializing freely in natural enclosures.
            </p>
          </div>

          <div id="donate" className="bg-white p-8 rounded-2xl border border-emerald-500/20 shadow-sm hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 space-y-4 ring-2 ring-emerald-600/10 animate-fadeInUp [animation-delay:200ms]">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700">
              <Share2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-stone-900">Empowering Local Mahouts</h3>
            <p className="text-stone-600 text-sm leading-relaxed mb-4">
              True conservation involves communities. Your bookings and donations directly support local elephant handlers, transition them to positive reinforcement care models, and provide food and veterinary supplies.
            </p>
            <a 
              href="https://your-fundraiser-link.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block w-full text-center text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-900 py-3 rounded-lg transition-colors duration-200 shadow-sm"
            >
              Support the Mahouts Fund →
            </a>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-stone-200/80 shadow-sm hover:shadow-md hover:-translate-y-1.5 transition-all duration-300 space-y-4 animate-fadeInUp [animation-delay:400ms]">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-stone-900">Conservation Education</h3>
            <p className="text-stone-600 text-sm leading-relaxed">
              We bridge the gap between people and elephants. Visitors learn first-hand about elephant behavior, complex social bonds, and the critical status of Asian elephants in Nepal.
            </p>
          </div>
        </div>
      </section>

      {/* MEET THE HERD SECTION */}
      <section id="herd" className="py-24 bg-stone-100/50 border-t border-stone-200 px-4">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-2">
            <span className="text-emerald-700 text-xs font-bold uppercase tracking-wider">Sanctuary Residents</span>
            <h2 className="text-3xl font-bold text-stone-900 tracking-tight">Meet Our Rescued Herd</h2>
            <div className="h-1 w-12 bg-emerald-600 mx-auto rounded mt-2"></div>
            <p className="text-stone-600 max-w-md mx-auto text-sm pt-2">Every elephant in our sanctuary has a history. Meet the gentle giants who now call our chain-free habitat home.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Elephant 1 - Kali */}
            <div className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 flex flex-col">
              <div className="relative aspect-square w-full bg-stone-200">
                <Image 
                  src="/elephant-1.jpg" 
                  alt="Rescued elephant Kali" 
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover" 
                />
                <div className="absolute top-4 right-4 bg-emerald-700 text-white text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full shadow-md">
                  Gentle Matriarch
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-stone-900">Kali</h3>
                  <p className="text-xs text-stone-500 flex items-center gap-1">
                    <Info className="w-3.5 h-3.5 text-emerald-600" /> Matriarch · Age 38 · Rescued in 2024
                  </p>
                  <p className="text-stone-600 text-sm leading-relaxed pt-2">
                    Kali spent over 25 years carrying tourists in Chitwan. Today, she is the wise leader of our small herd, known for her calm presence and love for river bathing.
                  </p>
                </div>
                <div className="border-t border-stone-100 pt-4 flex justify-between items-center text-xs font-bold text-emerald-800">
                  <span>Favorite Activity: River bathing</span>
                  <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded text-[10px]">Healthy</span>
                </div>
              </div>
            </div>

            {/* Elephant 2 - Lucky */}
            <div className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 flex flex-col">
              <div className="relative aspect-square w-full bg-stone-200">
                <Image 
                  src="/elephant-2.jpg" 
                  alt="Rescued elephant Lucky" 
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover" 
                />
                <div className="absolute top-4 right-4 bg-emerald-700 text-white text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full shadow-md">
                  Energetic & Playful
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-stone-900">Lucky</h3>
                  <p className="text-xs text-stone-500 flex items-center gap-1">
                    <Info className="w-3.5 h-3.5 text-emerald-600" /> Juvenile · Age 12 · Rescued in 2025
                  </p>
                  <p className="text-stone-600 text-sm leading-relaxed pt-2">
                    Lucky was rescued as a young working elephant. Filled with curiosity, he spends his time foraging in the bamboo groves and learning social behaviors from Kali.
                  </p>
                </div>
                <div className="border-t border-stone-100 pt-4 flex justify-between items-center text-xs font-bold text-emerald-800">
                  <span>Favorite Activity: Mud sliding</span>
                  <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded text-[10px]">Active</span>
                </div>
              </div>
            </div>

            {/* Elephant 3 - Chanchal */}
            <div className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 flex flex-col">
              <div className="relative aspect-square w-full bg-stone-200">
                <Image 
                  src="/elephant-3.jpg" 
                  alt="Rescued elephant Chanchal" 
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover" 
                />
                <div className="absolute top-4 right-4 bg-emerald-700 text-white text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full shadow-md">
                  Calm Observer
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-stone-900">Chanchal</h3>
                  <p className="text-xs text-stone-500 flex items-center gap-1">
                    <Info className="w-3.5 h-3.5 text-emerald-600" /> Matriarch · Age 45 · Rescued in 2023
                  </p>
                  <p className="text-stone-600 text-sm leading-relaxed pt-2">
                    Chanchal is the quietest member of our herd. After working for decades, she was transitioned to the sanctuary, where she enjoys slow grazing and dust baths.
                  </p>
                </div>
                <div className="border-t border-stone-100 pt-4 flex justify-between items-center text-xs font-bold text-emerald-800">
                  <span>Favorite Activity: Grass wrapping</span>
                  <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded text-[10px]">Peaceful</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ETHICAL VISITOR EXPERIENCES SECTION */}
      <section id="experiences" className="py-24 max-w-6xl mx-auto px-4 border-t border-stone-200">
        <div className="text-center space-y-2 mb-16">
          <span className="text-emerald-700 text-xs font-bold uppercase tracking-wider">Visitor Programs</span>
          <h2 className="text-3xl font-bold text-stone-900 tracking-tight">Ethical Sanctuary Experiences</h2>
          <div className="h-1 w-12 bg-emerald-600 mx-auto rounded mt-2"></div>
          <p className="text-stone-600 max-w-md mx-auto text-sm pt-2">Interact with elephants respectfully. No riding, no hooks, no forced shows. Just natural, compassionate observation.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Experience 1 */}
          <div className="bg-white p-8 rounded-2xl border border-stone-200/80 shadow-sm hover:shadow-md hover:-translate-y-1.5 transition-all duration-300 space-y-5">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700">
              <Footprints className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-stone-900">Jungle Walks Alongside Elephants</h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                Stroll side-by-side with our elephants in Sauraha&apos;s buffer zone. Walk at their pace, watch them forage naturally, and feel the magic of their gentle presence.
              </p>
            </div>
            <div className="text-xs text-stone-400">Duration: 2 Hours · Small Group Sizes</div>
          </div>

          {/* Experience 2 */}
          <div className="bg-white p-8 rounded-2xl border border-stone-200/80 shadow-sm hover:shadow-md hover:-translate-y-1.5 transition-all duration-300 space-y-5">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700">
              <Compass className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-stone-900">Feed Preparation & Nutrition</h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                Join our mahouts in preparing nutritious packages (kuchi) of grass, salt, and molasses, then feed them directly. Learn about their custom veterinary care and diet.
              </p>
            </div>
            <div className="text-xs text-stone-400">Duration: 1.5 Hours · Family Friendly</div>
          </div>

          {/* Experience 3 */}
          <div className="bg-white p-8 rounded-2xl border border-stone-200/80 shadow-sm hover:shadow-md hover:-translate-y-1.5 transition-all duration-300 space-y-5">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700">
              <Eye className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-stone-900">River Bathing Observation</h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                Accompany the herd down to the river bank. Watch from a safe, respectful distance as the elephants splash, socialize, and scrub themselves in the cool waters.
              </p>
            </div>
            <div className="text-xs text-stone-400">Duration: 1 Hour · Highly Photogenic</div>
          </div>
        </div>
      </section>

      {/* MEDIA / GALLERY SECTION */}
      <section id="gallery" className="py-24 bg-stone-100 border-y border-stone-200 px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <span className="text-emerald-700 text-xs font-bold uppercase tracking-wider">Visual Stories</span>
            <h2 className="text-3xl font-bold text-stone-900 tracking-tight font-sans">Campaign Media Hub</h2>
            <div className="h-1 w-12 bg-emerald-600 mx-auto rounded mt-2"></div>
            <p className="text-stone-600 max-w-md mx-auto text-sm pt-2">Visual truth and awareness directly from our monitoring efforts.</p>
          </div>
          
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            
            {/* Gallery Image 1 */}
            <div className="relative group aspect-video bg-stone-200 rounded-xl overflow-hidden border border-stone-300 shadow-sm cursor-pointer">
              <Image 
                src="/elephant-1.jpg" 
                alt="Rescued elephant in sanctuary" 
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ease-out text-white">
                  <p className="text-xs font-bold uppercase tracking-wider text-emerald-400">Sanctuary Life</p>
                  <p className="text-sm font-semibold mt-0.5">Peaceful morning bath in the ethical river sanctuary.</p>
                </div>
              </div>
            </div>

            {/* Gallery Image 2 */}
            <div className="relative group aspect-video bg-stone-200 rounded-xl overflow-hidden border border-stone-300 shadow-sm cursor-pointer">
              <Image 
                src="/elephant-2.jpg" 
                alt="Rescued elephant in sanctuary" 
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ease-out text-white">
                  <p className="text-xs font-bold uppercase tracking-wider text-emerald-400">Wild Roaming</p>
                  <p className="text-sm font-semibold mt-0.5">Roaming freely in the protected dense bamboo forests.</p>
                </div>
              </div>
            </div>

            {/* Gallery Image 3 */}
            <div className="relative group aspect-video bg-stone-200 rounded-xl overflow-hidden border border-stone-300 shadow-sm cursor-pointer">
              <Image 
                src="/elephant-3.jpg" 
                alt="Rescued elephant in sanctuary" 
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ease-out text-white">
                  <p className="text-xs font-bold uppercase tracking-wider text-emerald-400">Safe Herd</p>
                  <p className="text-sm font-semibold mt-0.5">A social herd bonding in safe, chain-free environments.</p>
                </div>
              </div>
            </div>

            {/* Gallery Image 4 */}
            <div className="relative group aspect-video bg-stone-200 rounded-xl overflow-hidden border border-stone-300 shadow-sm cursor-pointer">
              <Image 
                src="/elephant-4.jpg" 
                alt="Closer shot of elephant trunk" 
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ease-out text-white">
                  <p className="text-xs font-bold uppercase tracking-wider text-emerald-400">Connection</p>
                  <p className="text-sm font-semibold mt-0.5">Close-up connection showing the gentle, majestic giant.</p>
                </div>
              </div>
            </div>

            {/* Gallery Image 5 */}
            <div className="relative group aspect-video bg-stone-200 rounded-xl overflow-hidden border border-stone-300 shadow-sm cursor-pointer">
              <Image 
                src="/elephant-5.jpg" 
                alt="Closer shot of elephant trunk" 
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ease-out text-white">
                  <p className="text-xs font-bold uppercase tracking-wider text-emerald-400">Playtime</p>
                  <p className="text-sm font-semibold mt-0.5">Natural foraging and playtime in lush tropical grasslands.</p>
                </div>
              </div>
            </div>

            {/* Gallery Image 6 */}
            <div className="relative group aspect-video bg-stone-200 rounded-xl overflow-hidden border border-stone-300 shadow-sm cursor-pointer">
              <Image 
                src="/elephant-6.jpg" 
                alt="Closer shot of elephant trunk" 
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ease-out text-white">
                  <p className="text-xs font-bold uppercase tracking-wider text-emerald-400">Reunion</p>
                  <p className="text-sm font-semibold mt-0.5">Reunited elephant families living in complete freedom.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* VOLUNTEER & BOOKING INQUIRY FORM */}
      <section id="volunteer" className="py-24 max-w-xl mx-auto px-4">
        <VolunteerForm />
      </section>

      {/* FOOTER */}
      <footer className="bg-stone-900 text-stone-400 py-16 px-4 border-t border-stone-800 text-sm">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <p>© 2026 The Chain Free Project. Dedicated to ethical, ride-free elephant sanctuary experiences.</p>
          <div className="flex gap-8">
            <a href="#about" className="hover:text-white transition-colors duration-200">About Our Ethos</a>
            <a href="#herd" className="hover:text-white transition-colors duration-200">Meet Our Herd</a>
            <a href="#volunteer" className="hover:text-white transition-colors duration-200">Bookings / Volunteers</a>
          </div>
        </div>
      </footer>

      {/* FLOATING WHATSAPP CHAT WIDGET */}
      <WhatsAppWidget />

    </div>
  );
}