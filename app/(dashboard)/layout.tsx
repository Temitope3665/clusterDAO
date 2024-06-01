import '@/styles/globals.css';
import RootLayoutsComponent from '@/components/root-layout';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <RootLayoutsComponent>{children}</RootLayoutsComponent>;
}
