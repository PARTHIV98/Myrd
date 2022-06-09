import Heading from "components/Heading";
import React, { useEffect, useRef, useState } from "react";
import styles from "scss/components/FlexibleComponentStyles/CareersSection.module.scss";
import Image from "next/image";
import Link from "next/link";
import { client} from "client";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import Cf7FormWrapper from "./cf7-form-wrapper";

interface Props {
  QueryData: any;
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

    <div className="form-fields row d-flex careers-form">
      {inputData.properties.form.fields.map((item,index) => {
      const inputName = item?.name;
      const inputType = item?.type;
      const labels = item?.labels;
      // console.log(item);
      return(
      <div className="form-field col" key={index}>
        <div className="form-field-wrap">
          <span className={`wpcf7-form-control-wrap ${inputName}`}>
          
            {inputType == "select" ? (
              <select onChange={(e) => handleFieldChange(inputName, e)} name={inputName} placeholder={labels[0]} className="outline-style">
                {
                  labels.map((lbl,vl)=>(
                    <option value={lbl} key={vl}>{lbl}</option>
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
              (<span className="requiredError" key={index}>{item[inputName]}</span>)
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

function CareersSection({ QueryData }: Props): JSX.Element {
  const MainHeading = QueryData?.heading;
  const HeadingTag = QueryData?.headingTag;
  const description = QueryData?.description;
  const positions = QueryData?.positionsList;
  const { useQuery } = client;
  const careersFormId = useQuery().themeGeneralSettings?.generalThemeSettings?.careersFormId;

  const [setActive, setActiveState] = useState("");
  const [setHeight, setHeightState] = useState("0px");
  const content = useRef(null);
  const [formInput,setFormInputs] = useState({});
  function toggleAccordion() {
    setHeightState(
      setActive === "active" ? "0px" : `${content.current.scrollHeight}px`
    );
  }

  const [modal,showModal]=useState(false);
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
    
    fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/contact-form-7/v1/contact-forms/${careersFormId}`,{
      method:"GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setFormInputs(data)})
  }, [])
  // console.log(formInput);
 
  return (
    <>
      <section className="careers_section commonPadding">
        <div className="container">
          {positions ? (
            <Accordion className={`${styles.positionslist} d-flex justify-space`} key="accordian_1">
              {positions.map((item, index) => {
                const positionTitle = item?.positionTitle;
                const positionContent = item?.positionDescription;
                return (
                    <AccordionItem key={index} className={`${styles.positionbox}`} id={`my-id-${index}`}>
                        <AccordionItemHeading className={styles.positionHeader}>
                            <AccordionItemButton>
                              <>
                              <Heading level="h4" className={`${styles.h4}`}>
                                {positionTitle}
                              </Heading>

                              <p
                                dangerouslySetInnerHTML={{
                                  __html: "Click here for more information",
                                }}
                              />
                              <Link href="#" ><a className="commonButton commonButtonSecondary" onClick={(e)=>toggleModal(e)}>Apply Now <i className="fa fa-long-arrow-alt-right"></i></a></Link>
                              </>
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel className={styles.positionBody}>
                          <div className={styles.positionContent}
                            dangerouslySetInnerHTML={{
                              __html: positionContent ?? "",
                            }}
                          />  
                        </AccordionItemPanel>
                    </AccordionItem>
                );
              })}
            </Accordion>
          ) : (
            ""
          )}
        </div>
      </section>

      {modal ? (
        <div className={`modal fade ${modal?"show":""}`} style={{display: `${modal?"block":"none"}`}}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close custom-close" data-dismiss="modal" onClick={(e) => closeModal(e)}><i className="fas fa-times"></i></button>
                <Image
                        
                          src={`${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-content/uploads/2022/05/seo-banner-1.jpg`}
                          alt="popup_img"
                          layout="responsive"
                          width={500}
                          height={201}
                        />
              </div>
              <div className="modal-body">
                <h3 className="mb-4">Apply Now</h3>
            
                <Cf7FormWrapper url={`${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/contact-form-7/v1/contact-forms/${careersFormId}/feedback`}>
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

export default CareersSection;


