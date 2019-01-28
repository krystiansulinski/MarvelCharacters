import React, { Component } from "react";
import { getPicture } from "../utils/index";

class Character extends Component {
  constructor(props) {
    super(props)
    this.id = props.id;
    this.src = props.src;
    this.name = props.name;
    this.onClick = props.onClick;
    this.className = props.className;
    this.imageSize = props.imageSize;
    this.parentClassName = props.parentClassName;
  }

  render() {
    const id = this.id;
    const src = this.src;
    const name = this.name;
    const className = this.className;
    const onClick = this.onClick;
    const size = this.imageSize;
    const parentClassName = this.parentClassName;

    return (
      <div className={parentClassName} key={"c" + id}>
        <img className={className}
          key={name}
          src={getPicture(src, size)}
          alt={name}
          onClick={() => onClick(id)}
        />
        <div className="title" key={"t" + id}>
          {name}
        </div>
      </div>
    );
  }
}

export default Character;