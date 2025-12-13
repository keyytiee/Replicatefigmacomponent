import { useState, useEffect } from "react";
import imgUntitledDesign41 from "figma:asset/0f43c782522af7290a29a6e4387b4648c9fd1c0c.png";
import PawPrint from "./PawPrint";

interface DescriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (title: string, description: string) => void;
  initialTitle?: string;
  initialDescription?: string;
}

function ReturnButton({ onClick }: { onClick: () => void }) {
  return (
    <button 
      className="absolute h-[21.998px] left-[35px] top-[53px] w-[9px] cursor-pointer hover:opacity-70 transition-opacity z-20" 
      data-name="Return Button"
      onClick={onClick}
    >
      <div className="absolute inset-[0_-8.6%_-2.67%_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 23">
          <g id="Return Button">
            <line id="Line 11" stroke="var(--stroke-0, black)" x1="9.38698" x2="0.386979" y1="0.316619" y2="11.3166" />
            <line id="Line 12" stroke="var(--stroke-0, black)" x1="8.5954" x2="0.595762" y1="22.2925" y2="11.2941" />
          </g>
        </svg>
      </div>
    </button>
  );
}

function ConfirmButton({ onClick }: { onClick: () => void }) {
  return (
    <button 
      className="absolute contents left-[35px] top-[860px] cursor-pointer" 
      data-name="Confirm Button"
      onClick={onClick}
    >
      <div className="absolute bg-[#e5d0ac] h-[53.541px] left-[35px] rounded-[15px] top-[860px] w-[357.999px] hover:bg-[#d9c49d] transition-colors">
        <div aria-hidden="true" className="absolute border border-[#303030] border-solid inset-[-1px] pointer-events-none rounded-[16px]" />
      </div>
      <p className="absolute font-['Plus_Jakarta_Sans:ExtraBold',sans-serif] font-extrabold h-[30px] leading-[normal] left-[214px] text-[#303030] text-[20px] text-center top-[872px] tracking-[-0.2px] translate-x-[-50%] w-[186px] pointer-events-none">Save</p>
    </button>
  );
}

export default function DescriptionModal({ isOpen, onClose, onSave, initialTitle = '', initialDescription = '' }: DescriptionModalProps) {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);

  useEffect(() => {
    if (isOpen) {
      setTitle(initialTitle);
      setDescription(initialDescription);
    }
  }, [isOpen, initialTitle, initialDescription]);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(title, description);
    onClose();
  };

  return (
    <div className="absolute inset-0 bg-white z-[80]" data-name="Description Modal">
      <div className="absolute h-[926px] left-[-2px] opacity-10 top-0 w-[428px]" data-name="Untitled design (4) 1">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgUntitledDesign41} />
      </div>
      
      <ReturnButton onClick={onClose} />
      
      <p className="absolute font-['Plus_Jakarta_Sans:ExtraBold',sans-serif] font-extrabold h-[20px] leading-[normal] left-[213.5px] text-[#303030] text-[20px] text-center top-[49px] tracking-[-0.2px] translate-x-[-50%] w-[200px]">Add Description</p>
      
      {/* Title Section */}
      <p className="absolute font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold h-[20px] leading-[normal] left-[69px] text-[#303030] text-[16px] top-[120px] tracking-[-0.16px] w-[100px]">Title</p>
      
      <div className="absolute bg-[rgba(217,217,217,0.3)] border border-[rgba(0,0,0,0.2)] border-solid h-[60px] left-[69px] rounded-[10px] top-[150px] w-[289px]" />
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter title"
        maxLength={50}
        className="absolute left-[82px] top-[165px] w-[263px] h-[30px] bg-transparent border-none outline-none font-['Plus_Jakarta_Sans:Regular',sans-serif] text-[16px] text-black placeholder:text-[rgba(0,0,0,0.5)]"
      />
      
      {/* Description Section */}
      <p className="absolute font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold h-[20px] leading-[normal] left-[69px] text-[#303030] text-[16px] top-[240px] tracking-[-0.16px] w-[150px]">Description</p>
      
      <div className="absolute bg-[rgba(217,217,217,0.3)] border border-[rgba(0,0,0,0.2)] border-solid h-[500px] left-[69px] rounded-[10px] top-[270px] w-[289px]" />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter description (optional)"
        maxLength={500}
        className="absolute left-[82px] top-[285px] w-[263px] h-[470px] bg-transparent border-none outline-none resize-none font-['Inter:Regular',sans-serif] text-[14px] text-black leading-relaxed placeholder:text-[rgba(0,0,0,0.5)]"
      />
      
      <ConfirmButton onClick={handleSave} />
      
      {/* Decorative Paw Prints */}
      <PawPrint className="absolute top-[110px] right-[20px] opacity-8 pointer-events-none rotate-[-20deg]" size={26} color="#303030" />
      <PawPrint className="absolute top-[800px] left-[18px] opacity-8 pointer-events-none rotate-[18deg]" size={28} color="#303030" />
    </div>
  );
}