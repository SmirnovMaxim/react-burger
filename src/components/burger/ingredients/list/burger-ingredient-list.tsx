import React, {SyntheticEvent, useEffect, useRef, useState} from 'react';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import {GroupIngredient, Ingredient, Tab as TabType} from "../../../../types";
import {Types} from '../../../../enums';
import Styles from './burger-ingredient-list.module.css';
import data from '../../../../utils/data.json';
import IngredientGroup from '../group/ingredient-group';

function BurgerIngredientList() {
  const [tabs, setTabs] = useState<TabType[]>([]);
  const [currentTab, setCurrentTab] = useState<TabType>();
  const [groups, setGroups] = useState<GroupIngredient[]>([
    {
      name: 'Булки',
      type: Types.BUN,
      items: [],
    },
    {
      name: 'Соусы',
      type: Types.SAUCE,
      items: [],
    },
    {
      name: 'Начинки',
      type: Types.MAIN,
      items: [],
    },
  ]);

  const ingredients: Ingredient[] = data;
  const groupRefs: any = {};
  const contentRef = useRef<HTMLDivElement>(null);

  const offset = 88 + 80 + 76 + 15;

  const onChangeTab = (tab: TabType): void => {
    setCurrentTab(tab);
    if (contentRef.current) {
      contentRef.current.scrollTop = groupRefs[tab.type].offsetTop - offset;
    }
  };
  const onScroll = (e: SyntheticEvent) => {
    let {scrollTop} = e.currentTarget;
    scrollTop += offset;
    const coords = Object.keys(groupRefs).map((type: string) => ({
      type,
      top: groupRefs[type].offsetTop,
    }));
    let result: any = null;

    coords.forEach((_) => {
      if ((!result && scrollTop >= _.top) || (scrollTop >= _.top && scrollTop >= result.top)) {
        result = _;
      }
    })

    if (result) {
      const tab = tabs.find(_ => _.type === result.type);
      if (tab) {
        setCurrentTab(tab);
      }
    }
  }
  const isActiveTab = (type: Types): boolean => currentTab?.type === type;

  useEffect(() => {
    const result: GroupIngredient[] = groups;

    ingredients.forEach((ingredient) => {
      const type: Types = ingredient.type as Types;
      const index = result.findIndex(group => group.type === type);

      if (index >= 0) {
        result[index].items.push(ingredient);
      }
    })
    setGroups(result);
    setTabs(result.map((group) => ({
      name: group.name,
      type: group.type,
    })));
  }, []);
  useEffect(() => {
    setCurrentTab(tabs[0]);
  }, [tabs]);

  return (
    <section className={Styles.list}>
      <h1 className="title">Соберите бургер</h1>
      <div className={Styles.tabBlock}>
        {tabs.map((tab) => (
          <Tab key={tab.type} value={tab.name} active={isActiveTab(tab.type)}
               onClick={() => onChangeTab(tab)}>
            {tab.name}
          </Tab>
        ))}
      </div>
      <div className={`${Styles.tabContent} scrollable`} ref={contentRef} onScroll={onScroll}>
        {groups.map((group: GroupIngredient) => (
          <div ref={val => groupRefs[group.type] = val} key={group.type} className={Styles.ingredientGroup}>
            <IngredientGroup group={group}/>
          </div>
        ))}
      </div>
    </section>
  );
}

export default BurgerIngredientList;
