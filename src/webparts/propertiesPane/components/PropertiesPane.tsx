import * as React from 'react';
import styles from './PropertiesPane.module.scss';
import { IPropertiesPaneProps } from './IPropertiesPaneProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class PropertiesPane extends React.Component<IPropertiesPaneProps, {}> {
  public render(): React.ReactElement<IPropertiesPaneProps> {
    return (
      <div className={ styles.propertiesPane }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to SharePoint!</span>
              <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
              <p className={ styles.description }>{escape(this.props.description)}</p>
              <p className={ styles.description }> Continent where i reside:  {escape(this.props.myContinent)}</p>
              <p className={ styles.description }> Number of Continent viseted: {(this.props.numContinentsVisited)}</p>
              
            </div>
          </div>
        </div>
      </div>
    );
  }
}
