import React from 'react';

import { Menu, Pane, DragHandleVerticalIcon, majorScale } from 'evergreen-ui';

import './app.css';

import Container, { ContainerProps } from './editor-core/container';
import MenuItem, { MenuItemProps } from './editor-core/menu-item';
import Editor from './editor-core/editor';
import Component, { ComponentProps } from './editor-core/component';
import useState from './dnd/use-state';
import PropertiesCard from './properties-card';
import TopNav from './top-nav';

const ComponentWrapper: React.FC<ComponentProps> = (props) => {
  const state = useState();

  return <Component
    {...props}
    style={{ padding: 8, margin: 5, border: state.selectedComponent === props.id ? '2px dotted red' : '2px dotted #474d66', display: 'flex', opacity: state.draggingElement === props.id ? 0.5 : 1 }}
    HandleProps={{
      style: { marginLeft: 'auto' },
      size: 24,
      className: 'handle'
    }}
    Handle={DragHandleVerticalIcon}
  />
}

const ContainerWrapper: React.FC<ContainerProps> = (props) => <Container
  {...props}
  HandleProps={{
    style: { marginLeft: 'auto' },
    size: 24,
    className: 'handle'
  }}
  Handle={DragHandleVerticalIcon}
  ListProps={{
    style: { minWidth: '80%' }
  }}
  className='canvas'
  style={{ display: 'flex' }}
/>

const MenuItemWrapper: React.FC<MenuItemProps> = (props) => <MenuItem Component={Menu.Item} {...props} />

function App() {
  return (
    <Editor
      DropCursorProps={{
        CursorProps: {
          className: 'drop-cursor'
        }
      }}
    >
      <TopNav />
      <Pane display="flex">
        <Pane
          display="flex"
          position="sticky"
          flexDirection="column"
          overflowY="auto"
          maxHeight="calc(100vh - 64px)"
          paddingX={majorScale(1)}
        >
          <Menu>
            <Menu.Group title="Components">
              <MenuItemWrapper component="text-field" >Text field</MenuItemWrapper>
              <MenuItemWrapper component="select">Select</MenuItemWrapper>
              <MenuItemWrapper component="form-group" isContainer>Form group</MenuItemWrapper>
            </Menu.Group>
          </Menu>
        </Pane>
        <ContainerWrapper isRoot Component={ComponentWrapper} />
        <PropertiesCard />
      </Pane>
    </Editor>
  );
}

export default App;
