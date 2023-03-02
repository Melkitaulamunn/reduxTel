import React from "react";

const GeneralModal = (
    {
        title = "",
        content = "",
        clsBtnTxt = "",
        clsBtnClck = () => { },
        cnfrmBtnTxt = "",
        cnfrmBtnClck = () => { },
        isCnfrm = false,
    }
) => {
    return (
        <div
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1000
            }}>
            <div
                style={{
                    width: "70%",
                    padding: "20px",
                    backgroundColor: "rgba(236, 243, 185,0.99)",
                    borderRadius: "10px",
                }}>
                <h1 className="text-center">{title}</h1>
                <p className="text-center">{content}</p>
                <div 
                style={{
                    display:"flex",
                    justifyContent:"center",
                    gap:"2rem",
                    marginTop:"1rem"
                    }}>
                    <button
                        className="btn btn-warning"
                        style={{
                            minWidth:"5rem",
                            padding:"5px 20px",
                            cursor:"pointer",
                            boxShadow:"3px 3px 0 0 lightgrey"
                        }}
                        onClick={clsBtnClck}>
                        {clsBtnTxt}
                    </button>
                    {
                        isCnfrm === true && (
                            <button
                            style={{
                                border:"3px solid crimson",
                                minWidth:"5rem",
                                padding:"5px 20px",
                                cursor:"pointer",
                                boxShadow:"3px 3px 0 0 lightgrey"
                            }}
                                className="btn btn-danger"
                                onClick={cnfrmBtnClck}>
                                {cnfrmBtnTxt}
                            </button>
                        )
                    }
                </div>


            </div>

        </div>
    )
}

export default GeneralModal