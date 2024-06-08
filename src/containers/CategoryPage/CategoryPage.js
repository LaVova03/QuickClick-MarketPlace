import styles from './CategoryPage.module.scss';
import CategoryPageBody from '../../components/CategoryPageBody/CategoryPageBody';

const CategoryPage = () => {
    return (
        <div className={styles.category_wrap} >
            <CategoryPageBody />
        </div >
    )
}

export default CategoryPage;