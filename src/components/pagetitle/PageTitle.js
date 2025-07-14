import React from 'react'



const PageTitle = (props) => {
    return (
        <div className="breadcrumb-section section-bg-2">
            <div className="container-fluid">
                <div className="breadcrumb-wrapper bg-cover"
                //  style={{ backgroundColor: '#fff' }}
                 >
                    <div className="container">
                        <div className="page-heading center">
                            <h1>{props.pagesub}</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PageTitle;


