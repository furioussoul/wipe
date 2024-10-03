'use client'
import { RiAddLine } from '@remixicon/react'
import Checkbox from '@/app/components/widgets/checkbox'
import Button from '@/app/components/widgets/button'
import AskAiStyle from '@/app/components/settings/AskAiStyle'
import cn from '@/utils/classnames'
import { useState } from 'react';

// 假设初始数据列表
const initialDataList = [
  { page_id: '1', name: 'Page 1' },
  { page_id: '2', name: 'Page 2' },
  // 更多数据...
];

// 假设初始映射
const initialListMapWithChildrenAndDescendants = {
  '1': { descendants: ['1-1', '1-2'] },
  '2': { descendants: ['2-1'] },
  // 更多映射...
};

// 假设初始选中ID集合
const initialCheckedIds = new Set();

// 假设初始复制值集合
const initialCopyValue = new Set();

// 假设初始搜索值
const searchValue = ''; // 这里假设搜索值为空

// 假设当前索引
const index = 0; // 这里假设索引为0

const disabled = false;


const AppList = () => {
  // 使用useState来管理状态
  const [currentDataList] = useState(initialDataList);
  const [listMapWithChildrenAndDescendants] = useState(initialListMapWithChildrenAndDescendants);
  const [checkedIds, setCheckedIds] = useState(initialCheckedIds);
  const [copyValue, setCopyValue] = useState(initialCopyValue);

  const handleCheck = (index) => {
    const current = currentDataList[index];
    const pageId = current.page_id;
    const currentWithChildrenAndDescendants = listMapWithChildrenAndDescendants[pageId];

    if (copyValue.has(pageId)) {
      if (!searchValue) {
        for (const item of currentWithChildrenAndDescendants.descendants)
          copyValue.delete(item);
      }
      copyValue.delete(pageId);
    } else {
      if (!searchValue) {
        for (const item of currentWithChildrenAndDescendants.descendants)
          copyValue.add(item);
      }
      copyValue.add(pageId);
    }

    setCopyValue(new Set([...copyValue]));
    setCheckedIds(new Set([...copyValue])); // 假设onSelect逻辑是更新checkedIds
  };

  return (
    <div className='group col-span-1 bg-white border-2 border-solid border-transparent rounded-xl shadow-sm min-h-[160px] flex flex-col transition-all duration-200 ease-in-out cursor-pointer hover:shadow-lg'>
      <div className='flex pt-[14px] px-[14px] pb-3 h-[66px] items-center gap-3 grow-0 shrink-0'>
        <div className={cn(
          'shrink-0 flex items-center justify-center p-2.5 bg-[#F5F8FF] rounded-md border-[0.5px] border-[#E0EAFF] opacity-50 hover:opacity-100'
        )}>
        </div>
      </div>

      <Button
        className='h-20 text-sm font-medium text-gray-700'
        variant='primary'
        onClick={() => console.log(123)}
      >
        <span className='text-[#D92D20]'>kkkk</span>
      </Button>
      <Checkbox
        className={cn(
          'shrink-0 mr-2 group-hover:border-primary-600 group-hover:border-[2px]',
          disabled && 'group-hover:border-transparent',
        )}
        checked={checkedIds.has(currentDataList[index].page_id)}
        disabled={disabled}
        onCheck={() => {
          if (disabled)
            return
          handleCheck(index)
        }}
      />
    </div>
  )
}

export default AppList
