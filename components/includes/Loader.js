'use client'

import React from "react";

export default class Loader extends React.Component{
    render(){
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <div className={"spinner-border text-"+this.props.color || "primary" } role="status">
                <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }
}