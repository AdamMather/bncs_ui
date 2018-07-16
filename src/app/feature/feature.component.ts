import { Component, OnInit, ViewChild, Renderer } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { NgForm, FormGroup, FormBuilder, FormArray } from '@angular/forms';

import { Router } from '@angular/router';
import { Global } from './../core/global';
import { NodeCentrePosition } from '../core/nodeCentrePosition.model';

@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.scss']
})

export class FeatureComponent implements OnInit {

  @ViewChild('myCanvas') canvas: any;
  public myCanvas: HTMLCanvasElement;
  public canvasElement: any;
  public lastX: number;
  public lastY: number;

  private objCoords: any = {};

  constructor(
    private router: Router,
    private global: Global,
    public renderer: Renderer
  ) { }

  ngOnInit(): void {

    this.global.path = this.router.url;

  }

  private draw2dCanvas(eleId: string): CanvasRenderingContext2D {
    this.canvas = <HTMLCanvasElement>document.getElementById(eleId);
    return this.canvas.getContext('2d');
  }

  public getCordinates(ev) {
    // get co-ordinates - mousemove event on goodCanvas1
    let currentX = ev.clientX;
    let currentY = ev.clientY;

    //console.log('X: ' + currentX + '\nY: ' + currentY);

  }

  public coordinates(ev, flag) {

    if (flag) {
      // beginning of line
      this.objCoords.startX = ev.clientX;
      this.objCoords.startY = ev.clientY;
    } else {
      // end of line
      this.objCoords.endX = ev.clientX;
      this.objCoords.endY = ev.clientY;
    }

    if (this.objCoords.startX != null && this.objCoords.endX != null && this.objCoords.endX != null && this.objCoords.endY != null) {

      //console.log('the object is complete:\nstartX: ' + this.objCoords.startX + '\nstartY: ' + this.objCoords.startY + '\nendX: ' + this.objCoords.endX + '\nendY: ' + this.objCoords.endY);

      // *** snap to nearest centrepoint
      let arrCentrePoints: Array<NodeCentrePosition> = []; 

      // get perimiter centre points of node
      this.global.arrNode.map(node => {
        arrCentrePoints.push(node.topCentre);
        arrCentrePoints.push(node.leftCentre);
        arrCentrePoints.push(node.bottomCentre);
        arrCentrePoints.push(node.rightCentre);
      })

      // loop through arrCentrePoint and compare each nodeCentrePosition pair with currentStart pair
      let arrStartX: Array<any> = [];
      let arrStartY: Array<any> = [];

      let arrEndX: Array<any> = [];
      let arrEndY: Array<any> = [];

      arrCentrePoints.map(cp => {
        // accumulate x,y co-ords
        arrStartX.push({
          pos: cp.x, diff: Math.abs(this.objCoords.startX - cp.x)
        });
        arrStartY.push({
          pos: cp.y, diff: Math.abs(this.objCoords.startY - cp.y)
        });

        arrEndX.push({
          pos: cp.x, diff: Math.abs(this.objCoords.endX - cp.x)
        });
        arrEndY.push({
          pos: cp.y, diff: Math.abs(this.objCoords.endY - cp.y)
        });

      })

      let startX = arrStartX.sort(function(a,b) { return a.diff - b.diff;})[0];
      let startY = arrStartY.sort(function(a,b) { return a.diff - b.diff;})[0];

      let endX = arrEndX.sort(function(a,b) { return a.diff - b.diff;})[0];
      let endY = arrEndY.sort(function(a,b) { return a.diff - b.diff;})[0];

      this.objCoords.startX = startX.pos;
      this.objCoords.startY = startY.pos;

      this.objCoords.endX = endX.pos;
      this.objCoords.endY = endY.pos;

       // draw line
      this.drawLine(this.objCoords);
      this.objCoords = {};
    }

  }

  private drawLine(obj): CanvasRenderingContext2D {

    let context = this.draw2dCanvas('goodCanvas1');

    context.beginPath();
    context.moveTo(obj.startX, obj.startY);
    context.lineTo(obj.endX, obj.endY);
    context.closePath();

    context.lineWidth = 1;
    context.strokeStyle = '#000';
    context.stroke();

    return context;
  }

  // HANDLERS

  handleStart(ev) {

    // get co-ordinates
    this.lastX = ev.clientX;
    this.lastY = ev.clientY;
  }

  handleMove(ev) {

    // get co-ordinates
    let ctx = this.canvasElement.getContext('2d');
    let currentX = ev.clientX;
    let currentY = ev.clientY;

    //
    ctx.beginPath();
    ctx.moveTo(currentX, currentY);
    ctx.lineTo(currentX, currentY);
    ctx.closePath();

    //
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 5;
    ctx.stroke();

    // get co-ordinates
    this.lastX = currentX;
    this.lastY = currentY;



  }

  handleEnd(ev) {
    console.log('handleEnd event: ' + ev);
  }

  onDragStart(): void {
    console.log('got drag start');
  }

  onDragMove(event: PointerEvent): void {
    console.log(`got drag move ${Math.round(event.clientX)} ${Math.round(event.clientY)}`);
  }

  onDragEnd(): void {
    console.log('got drag end');
  }

  trappedBoxes = ['Trapped 1', 'Trapped 2'];

  add(): void {


    this.trappedBoxes.push('New trapped');
  }

}
