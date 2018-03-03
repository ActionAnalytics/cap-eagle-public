import { Document } from './Document';
import { Organization } from './organization';
import { CommentPeriod } from './commentperiod';
import { Decision } from './decision';

export class Application {
  _id: string;
  _schemaName: string;
  id: string; // objectid

  _addedBy: string; // objectid -> User
  _updatedBy: string; // FUTURE
  dateAdded: Date;
  dateUpdated: Date;

  agency: string;
  areaHectares: number;
  businessUnit: string;
  cl_files: number[];
  code: string;
  name: string;
  description: string;
  interestID: number;
  internalID: number;
  isPublished: boolean;
  legalDescription: string;
  location: string;
  latitude: number;
  longitude: number;
  mapsheet: string;
  postID: number;
  projectDate: Date;
  _organization: string; // objectid -> Organization
  purpose: string;
  subpurpose: string;
  region: string;
  status: string;
  tantalisID: number;
  type: string;
  subtype: string;

  documents: Array<Document>;
  organization: Organization;
  currentPeriod: CommentPeriod;
  decision: Decision;

  constructor(obj?: any) {
    this._id                     = obj && obj._id                     || null;
    this._schemaName             = obj && obj._schemaName             || null;
    this.id                      = obj && obj.id                      || null;

    this._addedBy                = obj && obj._addedBy                || null;
    this._updatedBy              = obj && obj._updatedBy              || null;
    this.dateAdded               = obj && obj.dateAdded               || null;
    this.dateUpdated             = obj && obj.dateUpdated             || null;

    this.agency                  = obj && obj.agency                  || null;
    this.areaHectares            = obj && obj.areaHectares            || null;
    this.businessUnit            = obj && obj.businessUnit            || null;
    this.cl_files                = obj && obj.cl_files                || null;
    this.code                    = obj && obj.code                    || null;
    this.name                    = obj && obj.name                    || null;
    this.description             = obj && obj.description             || null;
    this.interestID              = obj && obj.interestID              || 0;
    this.internalID              = obj && obj.internalID              || 0;
    this.isPublished             = obj && obj.isPublished             || null;
    this.legalDescription        = obj && obj.legalDescription        || null;
    this.location                = obj && obj.location                || null;
    this.latitude                = obj && obj.latitude                || 0;
    this.longitude               = obj && obj.longitude               || 0;
    this.mapsheet                = obj && obj.mapsheet                || null;
    this.postID                  = obj && obj.postID                  || null;
    this.projectDate             = obj && obj.projectDate             || null;
    this._organization           = obj && obj._proponent              || null; // TODO: change to _organization
    this.purpose                 = obj && obj.purpose                 || null;
    this.subpurpose              = obj && obj.subpurpose              || null;
    this.region                  = obj && obj.region                  || null;
    this.status                  = obj && obj.status                  || null;
    this.tantalisID              = obj && obj.tantalisID              || 0;
    this.type                    = obj && obj.type                    || null;
    this.subtype                 = obj && obj.subtype                 || null;

    this.documents = [];
    this.organization = null;
    this.currentPeriod = null;
    this.decision = null;
  }
}
