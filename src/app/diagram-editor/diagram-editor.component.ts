import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import * as go from 'gojs';

@Component({
  selector: 'app-diagram-editor',
  templateUrl: './diagram-editor.component.html',
  styleUrls: ['./diagram-editor.component.css']
})
export class DiagramEditorComponent implements OnInit {

  private diagram: go.Diagram = new go.Diagram();
  @ViewChild('diagramDiv')
  private diagramRef: ElementRef;

  @Input()
  get model(): go.Model { return this.diagram.model; }
  set model(val: go.Model) { this.diagram.model = val; }

  @Output()
  nodeSelected = new EventEmitter<go.Node|null>();

  @Output()
  modelChanged = new EventEmitter<go.ChangedEvent>();

  constructor() {
    const $ = go.GraphObject.make;
    this.diagram = new go.Diagram();
    this.diagram.initialContentAlignment = go.Spot.Center;
    this.diagram.allowDrop = false;  // necessary for dragging from Palette
    this.diagram.undoManager.isEnabled = true;
    this.diagram.toolManager.mouseWheelBehavior = go.ToolManager.WheelZoom;
    this.diagram.addDiagramListener('ChangedSelection',
      e => {
        const node = e.diagram.selection.first();
        this.nodeSelected.emit(node instanceof go.Node ? node : null);
      });
    this.diagram.addModelChangedListener(e => e.isTransactionFinished && this.modelChanged.emit(e));

    this.diagram.nodeTemplate =
      $(go.Node, 'Auto',
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        $(go.Shape, 'RoundedRectangle',
          {
            fill: $(go.Brush, 'Linear', { 0: 'rgb(254, 201, 0)', 1: 'rgb(254, 162, 0)' }),
            strokeWidth: 0,
            portId: '',
            cursor: 'pointer',
            // allow many kinds of links
            fromLinkable: false,
            toLinkable: false,
            fromLinkableSelfNode: false, toLinkableSelfNode: false,
            fromLinkableDuplicates: false, toLinkableDuplicates: false
          },
          new go.Binding('fill', 'color')),
        $(go.TextBlock,
          { margin: 8, editable: false, font: 'bold 11pt helvetica'},
          new go.Binding('text').makeTwoWay())
      );

    this.diagram.nodeTemplate.selectionAdornmentTemplate =
      $(go.Adornment, 'Spot',
        $(go.Panel, 'Auto',
          $(go.Shape, { fill: null, stroke: 'blue', strokeWidth: 2 }),
          $(go.Placeholder)
        )
      );
    this.diagram.linkTemplate =
      $(go.Link,
        // allow relinking
        {curve: go.Link.Bezier, adjusting: go.Link.Stretch,
          reshapable: true, relinkableFrom: false, relinkableTo: false,
          toShortLength: 3},
        new go.Binding('points').makeTwoWay(),
        new go.Binding('curviness'),
        $(go.Shape, { strokeWidth: 1.5 }),
        $(go.Shape, { toArrow: 'standard', stroke: null }),
        $(go.Panel, 'Auto',
          $(go.Shape,  // the label background, which becomes transparent around the edges
            {
              fill: $(go.Brush, 'Radial',
                { 0: 'rgb(240, 240, 240)', 0.3: 'rgb(240, 240, 240)', 1: 'rgba(240, 240, 240, 0)' }),
              stroke: null
            }), $(go.TextBlock, 'transition',
            {
              textAlign: 'center',
              font: '9pt helvetica, arial, sans-serif',
              margin: 4,
              editable: false  // enable in-place editing
            },
            // editing the text automatically updates the model data
            new go.Binding('text').makeTwoWay())
        )
      );

  }

  ngOnInit() {
    this.diagram.div = this.diagramRef.nativeElement;
  }

}
