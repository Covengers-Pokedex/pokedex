'use client';
import { PokemonTypeWithColor } from '@/lib/api/type';
import convertHexToRGBA from '@/utils/convertHexToRGBA';
import classNames from 'classnames';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useToggle } from '@/hooks/useToggle';
import { useHidden } from '@/hooks/useHidden';

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const item = {
  hidden: { y: 150, opacity: 0, transition: { duration: 0.3 } },
  show: { y: 0, opacity: 1, transition: { duration: 0.3 } },
};
export default function SearchSection() {
  const [activedTypes, setActivedTypes] = useState<string[]>([]);
  const { toggleValue, switchToggle } = useToggle();

  const handleResetButton = () => {
    setActivedTypes([]);
  };

  const handleTypeButton = (type: string) => {
    if (activedTypes.includes(type)) {
      setActivedTypes(prev => prev.filter(prevType => prevType !== type));
      return;
    }
    setActivedTypes(prev => [...prev, type]);
  };

  return (
    <div className="pt-20">
      <form className="flex w-full justify-center  gap-1 pb-10">
        <div className="flex h-12 w-[60%] shadow-xl justify-between px-5 py-3 items-center rounded-xl bg-gray-50">
          <input placeholder="찾으실 포켓몬 이름을 입력하세요." className=" w-full px-3 py-1 outline-none" />
          <button className="w-16 h-full  rounded-md bg-gray-200 shadow-xl">검색</button>
        </div>
      </form>
      <div className="flex gap-3">
        <button
          className={classNames(
            toggleValue ? 'bg-gray-200 shadow-none top-1' : 'bg-white',
            ' px-5 py-3 flex hover:bg-gray-200 active:shadow-none active:top-1 justify-center relative rounded-xl items-center shadow-xl',
          )}
          onClick={switchToggle}
        >
          {toggleValue ? '타입 접기' : '타입 열기'}
        </button>
        <button
          onClick={handleResetButton}
          className="bg-white active:shadow-none active:top-1 relative hover:bg-gray-200 px-5 py-3 flex justify-center rounded-xl items-center shadow-xl"
        >
          초기화
        </button>
      </div>
      {toggleValue && (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="grid gap-3 pt-5 grid-cols-6 "
        >
          {Object.entries(PokemonTypeWithColor).map(([type, color]) => (
            <motion.div variants={item} key={type} className="relative h-[40px] w-full">
              <motion.button
                initial={{ top: '0', boxShadow: `0px 7px 2px ${convertHexToRGBA(color, 0.6)}`, opacity: '0.5' }}
                animate={
                  activedTypes.includes(type)
                    ? { top: '7px', boxShadow: `0px 0px 2px ${convertHexToRGBA(color, 0.6)}`, opacity: '1' }
                    : { top: '0', boxShadow: `0px 7px 2px ${convertHexToRGBA(color, 0.6)}`, opacity: '0.5' }
                }
                whileHover={{ opacity: '1' }}
                transition={{ duration: 0.2 }}
                onClick={() => {
                  handleTypeButton(type);
                }}
                className={classNames('rounded-md w-full flex absolute justify-center py-1.5 text-white')}
                style={{ backgroundColor: color }}
                key={type}
              >
                {type}
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
