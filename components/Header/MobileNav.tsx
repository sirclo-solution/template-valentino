/* library Package */
import {
  FC,
  useState,
  useEffect
} from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import {
  Logo,
  useCart,
} from '@sirclo/nexus'
import { LazyLoadComponent } from 'react-lazy-load-image-component'
import {
  Menu,
  ChevronDown,
  ChevronUp,
} from 'react-feather'
const CollapsibleNav = dynamic(() => import('@sirclo/nexus').then((mod) => mod.CollapsibleNav))

/* library Template */
import useWindowSize from 'lib/useWindowSize'

/* component */
import Placeholder from '../Placeholder'
import SideMenu from '../SideMenu/SideMenu'
import MobileShortcut from './MobileShortcut'
import ProfileMenu from './ProfileMenu'

/* styles */
import styles from 'public/scss/components/Header.module.scss'


const classesCollapsibleNav = {
  parentNavClassName: styles.menu,
  navItemClassName: styles.menu_item,
  selectedNavClassName: styles.menu_itemSelected,
  navValueClassName: styles.menu_item__value,
  dropdownIconClassName: styles.icon_down,
  childNavClassName: styles.menu_sub,
  subChildNavClassName: styles.menu_sub
};

const classesPlaceholderLogo = {
  placeholderImage: `${styles.placeholderItem} ${styles.placeholderItem_header__logo}`
}

const classesPlaceholderCollapsibleNav = {
  placeholderList: `${styles.placeholderItem} ${styles.placeholderItem_header__navMobile}`
}

const MobileNavButton: FC<any> = ({ lng }) => {
  const { data: dataCart } = useCart();
  const router = useRouter();
  const size: any = useWindowSize();

  const [openMenu, setOpenMenu] = useState<boolean>(false);

  useEffect(() => {
    setOpenMenu(false);
  }, [router.query]);

  const toogleMenu = () => setOpenMenu(!openMenu);

  return (
    <>
        <nav className={`
        navbar 
        navbar-light
        d-lg-none
        d-md-flex
        ${styles.nav_valentino} 
      `}>
          <div className={`container ${styles.navbar_mobile}`}>
            <div className={styles.navbar_menu}>
              <Menu
                className={styles.navbar_menu__icon}
                onClick={toogleMenu}
                size={size.width < 575 ? 18 : 24}
              />
            </div>
            <div className={styles.navbar_logo}>
              <LazyLoadComponent
                placeholder={
                  <Placeholder classes={classesPlaceholderLogo} withImage={true} />
                }
              >
                <Logo
                  imageClassName={styles.navbar_logo__image}
                  thumborSetting={{
                    width: size.width < 575 ? 200 : 400,
                    quality: 90
                  }}
                  lazyLoadedImage={false}
                />
              </LazyLoadComponent>
            </div>
            <ProfileMenu
              lng={lng}
              size={size}
              totalQuantity={dataCart?.totalItem}
              styles={styles}
            />
          </div>
        </nav>

        {openMenu &&
          <SideMenu
            openSide={openMenu}
            toogleSide={toogleMenu}
            positionSide="left"
            withLogo
            logo={
              <Logo
                imageClassName={styles.sidemenu_logo}
                thumborSetting={{
                  width: size.width < 575 ? 200 : 400,
                  format: "webp",
                  quality: 90,
                }}
                lazyLoadedImage={false}
              />
            }
            withClose
          >
            <CollapsibleNav
              dropdownIcon={<ChevronDown className={styles.icon_down_mobile__svg} />}
              dropdownOpenIcon={<ChevronUp className={styles.icon_down_mobile__svg} />}
              classes={classesCollapsibleNav}
              loadingComponent={
                <>
                  <Placeholder
                    classes={classesPlaceholderCollapsibleNav}
                    withList={true}
                    listMany={4}
                  />
                </>
              }
            />
          </SideMenu>
        }
      <MobileShortcut lng={lng} />
    </>
  );
};

export default MobileNavButton;