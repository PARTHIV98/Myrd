import React, { useEffect, useState } from "react";
import styles from "scss/components/Header.module.scss";
import Link from "next/link";
import { client, MenuLocationEnum } from "client";
import Image from "next/image";
import { useRouter } from "next/router";
import Cf7FormWrapper from "components/FlexibleComponents/cf7-form-wrapper";

interface Props {
  title?: string;
  description?: string;
}

interface Form{ 
  handler: any; 
  isLoading: Boolean;
  isSent:Boolean;
  hasError: any;
  inputData:any;
}


export const Form = function Form({ handler, isLoading, isSent, hasError,inputData,fieldError }) {
  const [formState, setFormState] = useState({})

  
//   const FieldData = (item,key) => {
//    const {name,type,placeholder,value} = item;
//     const inputName = name;
//       const inputType = type;  
//       const placeh = placeholder;
//       const val = value;
//       console.log(inputName,inputType,placeh,val,key);
//     return ( (inputType == "textarea" ? (<textarea name={inputName} onChange={(e) => handleFieldChange(inputName, e)} className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required"/>) : inputType == "submit" ? (<button type="submit" className="commonButton commonButtonOutlined form-submit-button">{item.values}</button>) : (<input onChange={(e) => handleFieldChange({inputName}, e)} type={`${inputType}`} placeholder={`${item.labels}`} className="outline-style"/>)))
//  }

  const handleFieldChange = (field, e) => {
  // console.log(formState[field]);
    setFormState({
      ...formState,
      [field]: e.target.value,
    })
  }

  const handleFileChange = (field, e) => {
    setFormState({
      ...formState,
      [field]: e.target.files[0],
    })
  }
  const handleFormSubmit = (e) => {
    handler(e, formState)
  }
  

  return (
<>

    <form onSubmit={handleFormSubmit}>

    <div className="form-fields row d-flex freereport-form">
      {inputData?.properties?.form?.fields.map((item,index) => {
      const inputName = item?.name;
      const inputType = item?.type;
      const labels = item?.labels;
      // console.log(item);
      return(
      <div className="form-field col">
        <div className="form-field-wrap">
          <span className={`wpcf7-form-control-wrap ${inputName}`}>
          
            {inputType == "select" ? (
              <select onChange={(e) => handleFieldChange(inputName, e)} name={inputName} placeholder={labels[0]} className="outline-style">
                {
                  labels.map((lbl,vl)=>(
                    <option value={vl}>{lbl}</option>
                  ))
                }
            </select>
            ) : inputType == "file" ? (
              <input type={`${inputType}`} name={inputName} onChange={(e) => handleFileChange(inputName, e)} placeholder={`${item.labels}`} className="wpcf7-form-control wpcf7-text"/>
            ) : inputType == "textarea" ? (
            <textarea name={inputName} onChange={(e) => handleFieldChange(inputName, e)} placeholder={`${item.labels}`} className="wpcf7-form-control wpcf7-text"/>
            ) : inputType == "submit" ? (
            <button type="submit" className="commonButton commonButtonOutlined form-submit-button">{item.values}</button>
            ) : (
            <>
            <input onChange={(e) => handleFieldChange(inputName, e)}  value={formState[inputName]} name={inputName} type={`${inputType}`} placeholder={`${item.labels}`} className="outline-style"/>
            </>
            )
            }
            {fieldError.map((item,index)=> 
              (<span className="requiredError">{item[inputName]}</span>)
            )}
          </span>
        </div>
      </div>
      )})}
    </div>
    <div className="form-status">
      {isLoading ? ( <div>{isLoading ? "Loading" : "false"}</div>): ""}
      {isSent ? ( <div className="success form-status-info">{isSent ? "Sent" : "false"}</div>):""}
      {hasError ? (<div className="alert form-status-info">{hasError || "null"}</div>) :""}
      
      </div>
    </form>

    </>
  )
}


function Header({
  title = "Headless by WP Engine",
  description,
}: Props): JSX.Element {
  const { menuItems } = client.useQuery();
   const { useQuery } = client;
  
  const logo = useQuery().themeGeneralSettings?.generalThemeSettings?.logo.sourceUrl();
  const LogoImage = ({ src, width, quality }) => {
    return `${String(logo)}?q=${quality || 100}`;
  };
  
  
  
  const Width = useQuery().themeGeneralSettings?.generalThemeSettings?.logo?.mediaDetails?.width;
  const height = useQuery().themeGeneralSettings?.generalThemeSettings?.logo?.mediaDetails?.height;
  const freeReportFormId = useQuery().themeGeneralSettings?.generalThemeSettings?.freeReportFormId;
  const links = menuItems({
    first:20,
    where: { location: MenuLocationEnum.PRIMARY },
  });

  const [showMe, setShowMe] = useState(false);
  function toggle() {
    setShowMe(!showMe);
  }
  const flatListToHierarchical = (
    data = [],
    { idKey = "id", parentKey = "parentId", childrenKey = "children" } = {}
  ) => {
    const tree = [];
    const childrenOf = {};
    data.forEach((item) => {
      const newItem = { ...item };
      const { [idKey]: id, [parentKey]: parentId = 0 } = newItem;
      childrenOf[id] = childrenOf[id] || [];
      newItem[childrenKey] = childrenOf[id];
      parentId
        ? (childrenOf[parentId] = childrenOf[parentId] || []).push(newItem)
        : tree.push(newItem);
    });
    return tree;
  };
  const $hierarchicalList = flatListToHierarchical(links?.nodes);
  const [dropdown, setDropdown] = useState(false);
  const router = useRouter();
  const [modal,showModal]=useState(false);
  const [formInput,setFormInputs] = useState({});
  function toggleModal(e){
    e.preventDefault();
    showModal(!modal);
    document.body.classList.add('modal-open');
  }
  function closeModal(e){
    e.preventDefault();
    showModal(!modal);
    document.body.classList.remove('modal-open');
  }

  useEffect(() => {
    
    fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/contact-form-7/v1/contact-forms/${freeReportFormId}`,{
      method:"GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setFormInputs(data)})
  }, [])
 
  
  const [stickyClass, setStickyClass] = useState('relative');

  useEffect(() => {
    window.addEventListener('scroll', stickNavbar);

    return () => {
      window.removeEventListener('scroll', stickNavbar);
    };
  }, []);

  const stickNavbar = () => {
    if (window !== undefined) {
      let windowHeight = window.scrollY;
      windowHeight > 500 ? setStickyClass('fixed animated') : setStickyClass('relative');
    }
  };

  return (
    <>
    <header className={stickyClass}>
      <div className="container">
        <div className={styles.wrap}>
          <div className={styles["title-wrap"]}>
            <p className={styles["site-title"]}>
              <Link href="/">
                <a>
                {logo ? (
                  <Image
                      loader={LogoImage}
                      src="loader.png"
                      alt="Myriad Solutionz"
                      
                      width={Width}
                      height={height}
                    />
                ):""}
                  
                </a>
              </Link>
            </p>
          </div>
          <div
            className={`${styles.menu} header-menu ${showMe ? "active" : ""}`}
          >
            <ul>
              {$hierarchicalList.map((link, index) => {
                
                const ln = $hierarchicalList.length;
                return (
                <li key={`${link.label}$-menu`}>
                  <Link href={link.url ?? ""}>
                    <a
                      href={link.url}
                      className={`${link.cssClasses} ${
                        link.children.length ? "has-submenu" : ""
                      } ${link.url === router.pathname ? "active" : ""}`} 
                      onClick={(e) => ln==index+1 ? toggleModal(e): ""}
                    >
                      
                      {link.label}
                      {link.children.length ? (
                        <span
                          aria-expanded={dropdown ? "true" : "false"}
                          onClick={() => setDropdown((prev) => !prev)}
                        ></span>
                      ) : (
                        ""
                      )}
                    </a>
                  </Link>
                  {link &&
                    link.children &&
                    (link.children.length ? (
                      <ul
                        className={`sub-menu dropdown ${
                          dropdown ? "show" : ""
                        }`}
                      >
                        {link.children.map((link) => (
                          <li key={`${link.label}$-menu`}>
                            <Link href={link.url ?? ""}>
                              <a href={link.url} onClick={() => setDropdown((prev) => !prev)}>{link.label}</a>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      ""
                    ))}
                </li>
              )})}
            </ul>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#collapsibleNavbar"
            onClick={toggle}
          >
            {" "}
            <span className="navbar-toggler-icon"></span>{" "}
          </button>
        </div>
      </div>
    </header>
    {modal ? (
      <div className={`modal fade ${modal?"show":""}`} style={{display: `${modal?"block":"none"}`}}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close custom-close" data-dismiss="modal" onClick={(e) => closeModal(e)}><i className="fas fa-times"></i></button>
              <img  
                  src={`${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-content/uploads/2022/05/seo-banner-1.jpg`}
                  alt="popup_img"
                      />
            </div>
            <div className="modal-body">
              <h3>Exclusive site analysis report</h3>
              <p>Leave your email address to get</p>
              <Cf7FormWrapper url={`${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/contact-form-7/v1/contact-forms/${freeReportFormId}/feedback`}>
                  <Form handler={undefined} isLoading={false} isSent={false} hasError={false} inputData={formInput} fieldError={[]}/>
                </Cf7FormWrapper>
            </div>
          </div> 
        </div>
      </div>
    ) : ""}
    </>
  );
}

export default Header;
