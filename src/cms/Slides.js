import React, { Component } from "react";
import styled from "styled-components";

// This is the editing component
const separator = "\n\n---n\n";

const defaultSeparator = "\n\n---n\n";

const SlideControlHeader = styled.div`
  /* styles omitted... */
`;

export class SlidesControl extends Component {

  /* ... */

  getSlideCommandBarActions(slides, i) {
    return getSlideActions(
      newSlides =>
        this.props.onChange(
          newSlides.join(this.props.field.get("separator", defaultSeparator))
        ),
      slides,
      i
    );
  }

  render() {
    const slides = this.getValue().split(
      this.props.field.get("separator", defaultSeparator)
    );
    const slideControls = slides.map((slideContent, i) => (
      <SlideControl
        {...this.props}
        key={i}
        value={slideContent}
        onChange={value => this.handleSlideChange(value, i)}
        commandBarActions={this.getSlideCommandBarActions(slides, i)}
      />
    ));
    return <div>{slideControls}</div>;
  }
}

const SlidePreview = props => {
  const MarkdownPreview = CMS.getWidget("markdown").preview;
  return <div><hr /><MarkdownPreview {...props} /></div>;
};

const CommandBar = styled.div`
  /* styles omitted... */
`;

const CommandBarButton = styled.button`
  /* styles omitted... */
`;

const SlideCommandBar = props => (
  <CommandBar>
    <CommandBarButton onClick={props.createSlideAbove}>
      + Above
    </CommandBarButton>
    <CommandBarButton onClick={props.createSlideBelow}>
      + Below
    </CommandBarButton>
    <CommandBarButton onClick={props.deleteSlide}>
      Delete
    </CommandBarButton>
    <CommandBarButton onClick={props.moveSlideUp}>
      Move Up
    </CommandBarButton>
    <CommandBarButton onClick={props.moveSlideDown}>
      Move Down
    </CommandBarButton>
  </CommandBar>
);

const getSlideActions = (onChange, slides, i) => {
  // The Array.prototype.slice method, which we'll use later, mutates
  // its argument, so we make a copy of it here.
  const slidesCopy = slides.slice();

  return {
    createSlideAbove: () => {
      slidesCopy.splice(i, 1, "", slides[i]);
      return onChange(slidesCopy);
    },
    createSlideBelow: () => {
      slidesCopy.splice(i + 1, 0, "");
      return onChange(slidesCopy);
    },
    deleteSlide: () => {
      slidesCopy.splice(i, 1);
      return onChange(slidesCopy);
    },
    moveSlideUp: () => {
      if (i === 0) {
        return onChange(slidesCopy);
      }
    },
    moveSlideDown: () => {
      if (i === slidesCopy.length) {
        return onChange(slidesCopy);
      }
      slidesCopy.splice(i, 2, slides[i + 1], slides[i]);
      return onChange(slidesCopy);
    }
  };
};