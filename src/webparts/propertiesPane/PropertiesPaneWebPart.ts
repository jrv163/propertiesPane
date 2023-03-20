import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneSlider
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'PropertiesPaneWebPartStrings';
import PropertiesPane from './components/PropertiesPane';
import { IPropertiesPaneProps } from './components/IPropertiesPaneProps';

import { 
  PropertyPaneContinentSelector,
  IPropertyPaneContinentSelectorProps
} from './controls';
import { update } from 'lodash';

export interface IPropertiesPaneWebPartProps {
  description: string;
  myContinent: string;
  numContinentsVisited: number;
}

export default class PropertiesPaneWebPart extends BaseClientSideWebPart <IPropertiesPaneWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IPropertiesPaneProps> = React.createElement(
      PropertiesPane,
      {
        description: this.properties.description,
        myContinent: this.properties.myContinent,
        numContinentsVisited: this.properties.numContinentsVisited
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  // protected get dataVersion(): Version {
  //   return Version.parse('1.0');
  // }

  private validateContinents(textBoxValue: string): string {
    const validateContinentsOptions: string[] = ['africa', 'antartica', 'asia', 'north america', 'south america'];
    const inputToValidate: string = textBoxValue.toLocaleLowerCase();

    return ( validateContinentsOptions.indexOf(inputToValidate) === -1 )
    ? 'invalid continent entry: valid option are "Africa", "Antartica", "Asia", "north america", "south america"'
    : ''
  };

  private onContinentSelectionChange(propertyPath: string, newValue: any): void {
    update(this.properties, propertyPath, (): any => { return newValue });
    this.render();
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                // PropertyPaneTextField('myContinent', {
                //   label: 'Continent where I currently reside',
                //   onGetErrorMessage: this.validateContinents.bind(this)
                // }),
                new PropertyPaneContinentSelector('myContinent', <IPropertyPaneContinentSelectorProps>{
                  label: 'Continent where I currently reside',
                  disabled: false,
                  selectedKey: this.properties.myContinent,
                  onPropertyChange: this.onContinentSelectionChange.bind(this),
                }),
                PropertyPaneSlider('numContinentsVisited', {
                  label: 'Number of continent I have visited',
                  min: 1, max: 6, showValue: true,
                }),
              ]
            }
          ]
        }
      ]
    };
  }
}
