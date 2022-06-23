import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ItemBlock from '../../components/ItemBlock';
import { Paginator } from '../../components/Paginator';
import { selectCartData } from '../../redux/cart/selectors';
import { addItem } from '../../redux/cart/slice';
import { CartItem } from '../../redux/cart/type';
import { fetchItems } from '../../redux/items/asyncActions';
import { selectItemData } from '../../redux/items/selectors';
import { setPage } from '../../redux/items/slice';
import { useAppDispatch } from '../../redux/store';
import { selectTypeData } from '../../redux/types/selector';
import styles from './home.module.scss';

const Home: React.FC = () => {
  const { items, status, page, pageCount } = useSelector(selectItemData);
  const { type, types } = useSelector(selectTypeData);
  const { cartItems, totalPrice } = useSelector(selectCartData);
  console.log(totalPrice);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    dispatch(fetchItems({ page, type }));
    if (type) {
      navigate(`/?type=${types.find((obj) => obj.type === type)?.name.replace(/ /g, '-')}`);
    }
  }, [page, type]);

  const onChangePage = (page: number) => {
    dispatch(setPage(page));
  };

  const addItemToCart = (item: CartItem) => {
    dispatch(addItem(item));
  };

  return (
    <>
      <div className={styles.title}>
        <h1 className={styles.title_name}>Аксессуары для Iphone 13 Pro Max</h1>
        <img className={styles.title_img} src="./img/iPhone13promax.png" alt="iphone 13 pro max" />
      </div>
      <ItemBlock
        items={items}
        cartItems={cartItems}
        addItemToCart={addItemToCart}
        status={status}
      />
      <Paginator pageCount={pageCount} page={page} onChangePage={onChangePage} />
    </>
  );
};
export default Home;
