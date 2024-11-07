import Image from 'next/image';
import MainForm from './components/main-form/MainForm';
import { useContext } from 'react';


export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-center text-7xl my-4 font-bold">Nakruter</h1>
      <MainForm />
    </div>
  );
}
