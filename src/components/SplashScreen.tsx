import imgMsuIitLogoRemovebgPreview1 from "figma:asset/24376333460d9f5960a65cee2748cb94458de998.png";

export default function SplashScreen() {
  return (
    <div className="bg-white relative size-full" data-name="Splash">
      <div className="absolute h-[297px] left-[73px] pointer-events-none rounded-[19px] top-[250px] w-[303px]" data-name="msu_iit_logo-removebg-preview 1">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover rounded-[19px] size-full" src={imgMsuIitLogoRemovebgPreview1} />
        <div className="absolute inset-0 shadow-[-7px_-5px_0px_0px_inset_#000000]" />
      </div>
      <div className="absolute font-['Plus_Jakarta_Sans:ExtraBold',sans-serif] font-extrabold h-[54px] leading-[normal] left-[219.5px] text-[#303030] text-[32px] text-center top-[554px] tracking-[-0.32px] translate-x-[-50%] w-[301px]">
        <p className="mb-0">{`Map your money. `}</p>
        <p>Master your life.</p>
      </div>
      <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal text-[#303030] text-[12px] text-center top-[850px] left-1/2 -translate-x-1/2 opacity-50">
        Tap to continue
      </p>
    </div>
  );
}
