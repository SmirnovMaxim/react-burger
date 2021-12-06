import React, {RefObject, SyntheticEvent, useEffect, useRef, useState} from 'react';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import {GroupIngredient, Ingredient, Tab as TabType, Coords} from "../../../../types";
import {Types} from '../../../../enums';
import Styles from './burger-ingredients.module.css';
import IngredientGroup from '../group/ingredient-group';

const OFFSET = 88 + 80 + 76 + 15;

function BurgerIngredients(props: Ingredient[]) {
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

  const ingredients: Ingredient[] = Object.values(props);
  const groupRefs: Record<Types, RefObject<HTMLDivElement>> = {
    [Types.BUN]: useRef<HTMLDivElement>(null),
    [Types.SAUCE]: useRef<HTMLDivElement>(null),
    [Types.MAIN]: useRef<HTMLDivElement>(null),
  }
  const contentRef = useRef<HTMLDivElement>(null);

  const onChangeTab = (tab: TabType): void => {
    setCurrentTab(tab);
    if (contentRef.current) {
      contentRef.current.scrollTop = (groupRefs[tab.type].current?.offsetTop || 0) - OFFSET;
    }
  };
  const onScroll = (e: SyntheticEvent) => {
    let {scrollTop} = e.currentTarget;
    scrollTop += OFFSET;

    const types: Types[] = Object.keys(groupRefs).map(type => type as Types);
    const coords: Coords[] = types.map((type) => ({
      type,
      top: groupRefs[type].current?.offsetTop || 0,
    }));
    let result: Coords | null = null;

    coords.forEach((coord) => {
      if ((!result && scrollTop >= coord.top) || (result  &&  scrollTop >= coord.top && scrollTop >= result.top)) {
        result = coord;
      }
    })

    const tab = tabs.find(tab => tab.type === result?.type);
    if (tab) {
      setCurrentTab(tab);
    }
  }
  const isActiveTab = (type: Types): boolean => currentTab?.type === type;

  useEffect(() => {
    const result: GroupIngredient[] = groups;

    ingredients.forEach((ingredient) => {
      const type = ingredient.type;
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
      <h1 className={Styles.title}>Соберите бургер</h1>
      <div className={Styles.tabBlock}>
        {tabs.map((tab) => (
          <Tab key={tab.type} value={tab.name} active={isActiveTab(tab.type)}
               onClick={() => onChangeTab(tab)}>
            {tab.name}
          </Tab>
        ))}
      </div>
      <div className={Styles.tabContent} ref={contentRef} onScroll={onScroll}>
        {groups.map((group: GroupIngredient) => (
          <div ref={groupRefs[group.type]} key={group.type} className={Styles.ingredientGroup}>
            <IngredientGroup group={group}/>
          </div>
        ))}
      </div>
    </section>
  );
}

export default BurgerIngredients;
