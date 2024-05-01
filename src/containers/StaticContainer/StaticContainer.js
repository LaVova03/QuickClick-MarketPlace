import './StaticContainer.scss';
import MainHeader from '../../components/MainHeader/MainHeader';
import MainFooter from '../../components/MainFooter/MainFooter';

const StaticContainer = ({ children }) => {
    return (
        <div>
            <MainHeader />
            <div className="static_container_children">{children}</div>
            <MainFooter />
        </div>
    )
}

export default StaticContainer;
