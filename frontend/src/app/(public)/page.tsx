import AnnouncementsTicker from '@/components/home/AnnouncementsTicker';
import HeroBanner from '@/components/home/HeroBanner';
import TempleTimings from '@/components/home/TempleTimings';
import UpcomingFestivals from '@/components/home/UpcomingFestivals';
import FeaturedSevas from '@/components/home/FeaturedSevas';
import DonationBanner from '@/components/home/DonationBanner';
import GalleryPreview from '@/components/home/GalleryPreview';
import ContactSection from '@/components/home/ContactSection';

export default function HomePage() {
  return (
    <>
      <AnnouncementsTicker />
      <HeroBanner />
      <TempleTimings />
      <UpcomingFestivals />
      <FeaturedSevas />
      <DonationBanner />
      <GalleryPreview />
      <ContactSection />
    </>
  );
}
