import React from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';

export default function Shop(){
    return (
        <>
            <div className={'profile'}>
                <section className="vh-100" style={{ backgroundColor: '#f4f5f7' }}>
                    <MDBContainer className="py-5 h-500">
                        <MDBRow className="justify-content-center  h-100">
                            <MDBCol lg="12" className="mb-4 mb-lg-0">
                                <MDBCard className="mb-6" style={{ borderRadius: '.5rem' }}>
                                    <MDBRow className="g-0">
                                        <MDBCol md="12" className="gradient-custom text-center text-black"
                                                style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                                            <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                                                          alt="Avatar" className="my-5" style={{ width: '200px' }} fluid />
                                            <MDBTypography tag="h1">Tên shop</MDBTypography>
                                            {/*<MDBCardText>Web Designer</MDBCardText>*/}
                                            <MDBIcon far icon="edit mb-5"></MDBIcon>
                                        </MDBCol>
                                    </MDBRow>
                                    <MDBRow>
                                            <MDBCardBody className="p-8">
                                                <button> Danh sách</button>
                                                <button> Sửa hồ sơ</button>
                                                <button> </button>
                                            </MDBCardBody>
                                    </MDBRow>
                                </MDBCard>
                            </MDBCol>
                        </MDBRow>

                    </MDBContainer>
                </section>
            </div>

        </>
    )
}