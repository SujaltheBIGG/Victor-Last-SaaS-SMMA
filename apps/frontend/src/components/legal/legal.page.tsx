import { FC, ReactNode } from 'react';
import Link from 'next/link';
import { LogoTextComponent } from '@gitroom/frontend/components/ui/logo-text.component';

export const LegalPage: FC<{
  title: string;
  updated: string;
  children: ReactNode;
}> = ({ title, updated, children }) => {
  return (
    <div className="min-h-screen w-full bg-[#0E0E0E] text-white px-[20px] py-[48px]">
      <div className="max-w-[760px] mx-auto flex flex-col gap-[32px]">
        <Link href="/" className="w-fit">
          <LogoTextComponent />
        </Link>
        <div className="flex flex-col gap-[8px]">
          <h1 className="text-[36px] font-[600] leading-[120%]">{title}</h1>
          <div className="text-[14px] text-[#A3A3A3]">Last updated {updated}</div>
        </div>
        <div className="flex flex-col gap-[28px] text-[15px] leading-[170%] text-[#D4D4D4] [&_h2]:text-[20px] [&_h2]:font-[600] [&_h2]:text-white [&_h2]:mb-[8px] [&_ul]:list-disc [&_ul]:ps-[20px] [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-[4px] [&_a]:underline">
          {children}
        </div>
      </div>
    </div>
  );
};
