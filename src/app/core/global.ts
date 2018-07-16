import { Injectable } from '@angular/core';
import { Node } from './node.model';
import { NodeSize } from './nodeSize.model';
import { NodeCentrePosition } from '../core/nodeCentrePosition.model';

@Injectable()
export class Global {

    public path: string;
    public rightCentre: NodeCentrePosition;

    public arrNodeSize: Array<NodeSize> = [];
    public arrNodeObjectId: Array<string> = [];

    public arrNode: Array<Node> = [];
    
}