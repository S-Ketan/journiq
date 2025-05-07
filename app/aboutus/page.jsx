'use client';
import Image from 'next/image';
import { Globe, HeartIcon, ShieldCheck, UsersIcon } from 'lucide-react';

export default function AboutPage() {
  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      bio: 'Travel enthusiast with 15+ years in tourism industry',
      img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80'
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      bio: 'Tech innovator passionate about travel solutions',
      img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d'
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-blue-600 to-green-500">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              About Journiq
            </h1>
            <p className="text-xl text-white/90">
              Redefining Travel Experiences Through Innovation
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-96 rounded-xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff"
                alt="Our mission"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Founded in 2023, Journiq emerged from a simple idea: travel planning 
                should be as exciting as the journey itself. We combine cutting-edge 
                technology with deep travel expertise to create seamless experiences.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <Globe className="w-8 h-8 text-blue-600 mb-2" />
                  <h3 className="font-semibold mb-2">Global Reach</h3>
                  <p className="text-sm text-gray-600">50+ Countries</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <HeartIcon className="w-8 h-8 text-green-600 mb-2" />
                  <h3 className="font-semibold mb-2">Passion Driven</h3>
                  <p className="text-sm text-gray-600">1000+ Happy Travelers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Globe className="w-8 h-8" />,
                title: "Exploration",
                text: "Encouraging discovery of new cultures and experiences"
              },
              {
                icon: <ShieldCheck className="w-8 h-8" />,
                title: "Trust",
                text: "Building relationships through transparency and reliability"
              },
              {


                icon: <UsersIcon className="w-8 h-8" />,
                title: "Community",
                text: "Connecting travelers and local communities responsibly"
              }
            ].map((value, index) => (
              <div key={index} className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Meet the Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="group relative overflow-hidden rounded-xl">
                <div className="relative h-80">
                  <Image
                    src={member.img}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-4 text-white">
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <p className="text-sm text-gray-300">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: '25K+', label: 'Happy Travelers' },
              { number: '500+', label: 'Destinations' },
              { number: '98%', label: 'Positive Reviews' },
              { number: '24/7', label: 'Support' }
            ].map((stat, index) => (
              <div key={index} className="p-4">
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-sm uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}