import svgPaths from "./svg-lzrqgnyksc";
import imgUntitledDesign41 from "figma:asset/0f43c782522af7290a29a6e4387b4648c9fd1c0c.png";

function ReturnButton() {
  return (
    <div className="absolute h-[21.998px] left-[35px] top-[53px] w-[9px]" data-name="Return Button">
      <div className="absolute inset-[0_-8.6%_-2.67%_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 23">
          <g id="Return Button">
            <line id="Line 11" stroke="var(--stroke-0, black)" x1="9.38698" x2="0.386979" y1="0.316619" y2="11.3166" />
            <line id="Line 12" stroke="var(--stroke-0, black)" x1="8.5954" x2="0.595762" y1="22.2925" y2="11.2941" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function ConfirmButton() {
  return (
    <div className="absolute contents left-[35px] top-[788px]" data-name="Confirm Button">
      <div className="absolute bg-[#e5d0ac] h-[53.541px] left-[35px] rounded-[15px] top-[788px] w-[357.999px]">
        <div aria-hidden="true" className="absolute border border-[#303030] border-solid inset-[-1px] pointer-events-none rounded-[16px]" />
      </div>
      <p className="absolute font-['Plus_Jakarta_Sans:ExtraBold',sans-serif] font-extrabold h-[30px] leading-[normal] left-[214px] text-[#303030] text-[20px] text-center top-[800px] tracking-[-0.2px] translate-x-[-50%] w-[186px]">Confirm</p>
    </div>
  );
}

function IconoirAttachment() {
  return (
    <div className="absolute left-[256px] size-[15px] top-[498px]" data-name="iconoir:attachment">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g id="iconoir:attachment">
          <path d={svgPaths.p79df8d2} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

export default function AddIncome() {
  return (
    <div className="bg-white relative size-full" data-name="Add Income">
      <div className="absolute h-[926px] left-0 opacity-10 top-0 w-[428px]" data-name="Untitled design (4) 1">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgUntitledDesign41} />
      </div>
      <ReturnButton />
      <p className="absolute font-['Plus_Jakarta_Sans:ExtraBold',sans-serif] font-extrabold h-[20px] leading-[normal] left-[213.5px] text-[#303030] text-[20px] text-center top-[49px] tracking-[-0.2px] translate-x-[-50%] w-[167px]">Add Transaction</p>
      <div className="absolute bg-[#d9d9d9] h-[363px] left-[1386px] rounded-[12px] shadow-[4px_4px_0px_0px_black] top-[2733px] w-[362px]" />
      <div className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[213.5px] not-italic text-[0px] text-black text-center top-[345px] tracking-[-0.16px] translate-x-[-50%] w-[259px]">
        <p className="font-['Inter:Bold',sans-serif] font-bold mb-0 text-[20px]">{`November 27, 2025 `}</p>
        <p className="text-[15px]">8:00 PM</p>
      </div>
      <div className="absolute bg-[rgba(217,217,217,0.5)] border border-black border-solid h-[41px] left-[124px] rounded-[10px] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.25)] top-[414px] w-[179px]" />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal h-[33px] leading-[normal] left-[212.5px] not-italic text-[15px] text-[rgba(0,0,0,0.5)] text-center top-[425px] tracking-[-0.15px] translate-x-[-50%] w-[273px]">P 00.00</p>
      <div className="absolute bg-[#701c1c] border border-black border-solid h-[195px] left-[19px] rounded-[30px] shadow-[4px_4px_0px_0px_black] top-[108px] w-[387px]" />
      <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal h-[27px] leading-[normal] left-[47px] text-[12px] text-white top-[135px] tracking-[-0.12px] w-[175px]">Bank Money</p>
      <p className="absolute font-['Plus_Jakarta_Sans:Regular',sans-serif] font-normal h-[18px] leading-[normal] left-[46px] text-[12px] text-white top-[262px] tracking-[-0.12px] w-[99px]">Current Balance</p>
      <p className="absolute font-['Plus_Jakarta_Sans:ExtraBold',sans-serif] font-extrabold h-[71px] leading-[normal] left-[47px] text-[36px] text-white top-[155px] tracking-[-0.36px] w-[400px]">P -1.00</p>
      <ConfirmButton />
      <p className="absolute font-['Inter:Italic',sans-serif] font-normal h-[21px] italic leading-[normal] left-[80px] text-[11px] text-[rgba(0,0,0,0.5)] top-[498px] tracking-[-0.11px] w-[259px]">Description</p>
      <div className="absolute bg-[rgba(217,217,217,0.3)] h-[196px] left-[67px] rounded-[5px] top-[486px] w-[300px]" />
      <div className="absolute bg-[#d9d9d9] h-[20px] left-[242px] rounded-[10px] top-[496px] w-[113px]" />
      <p className="absolute font-['Inter:Italic',sans-serif] font-normal h-[23px] italic leading-[normal] left-[272px] text-[11px] text-[rgba(0,0,0,0.5)] top-[499px] tracking-[-0.11px] w-[259px]">Attach Image</p>
      <IconoirAttachment />
    </div>
  );
}