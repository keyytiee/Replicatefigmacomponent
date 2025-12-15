import imgAlablav2 from "../assets/alablav.png";

interface CashMoneyCardProps {
  balance: number;
}

export default function CashMoneyCard({ balance }: CashMoneyCardProps) {
  return (
    <>
      <div className="absolute bg-[#ffcb3d] border border-black border-solid h-[148px] left-[69px] rounded-[31px] shadow-[4px_4px_0px_0px_#000000] top-[89px] w-[288px]" />
      <div className="absolute bg-[#303030] border border-black border-solid h-[178px] left-[44px] rounded-[31px] shadow-[4px_4px_0px_0px_#000000] top-[100px] w-[337px]" />
      <div className="absolute bg-[#701c1c] border border-black border-solid h-[195px] left-[20px] rounded-[30px] shadow-[4px_4px_0px_0px_#000000] top-[112px] w-[387px]" />
      <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal h-[27px] leading-[normal] left-[48px] text-white text-[12px] top-[139px] tracking-[-0.12px] w-[175px]">Cash Money</p>
      <p className="absolute font-['Plus_Jakarta_Sans:ExtraBold',sans-serif] font-extrabold h-[71px] leading-[normal] left-[48px] text-white text-[36px] top-[159px] tracking-[-0.36px] w-[400px]">₱ {balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
      <div className="absolute h-[162px] left-[257px] pointer-events-none top-[182px] w-[126px]" data-name="ALABLAV 2" style={{ zIndex: 999 }}>
        <img alt="" className="absolute inset-0 max-w-none object-center object-cover size-full" style={{ filter: 'drop-shadow(0px 15px 4px rgba(0,0,0,0.25))', zIndex: 999 }} src={imgAlablav2} />
      </div>
      <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal h-[18px] leading-[normal] left-[46px] text-[12px] text-white top-[262px] tracking-[-0.12px] w-[99px]">Current Balance</p>
    </>
  );
}