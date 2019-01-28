export class ResponseFormat {
  constructor(json) {
    this.code = json.code;
    this.status = json.status;
    this.copyright = json.copyright;
    this.attributionText = json.attributionText;
    this.attributionHTML = json.attributionHTML;
    this.etag = json.etag;
    this.data = new Data(json.data);
  }
}

class Data {
  constructor(data) {
    if (data) {
      this.offset = data.offset;
      this.limit = data.limit;
      this.total = data.total;
      this.count = data.count;
      this.results = [];
      data.results.forEach(result =>
        this.results.push(new Result(result))
      );
    }
  }
}

class Result {
  constructor(result) {
    if (result) {
      this.id = result.id;
      this.name = result.name;
      this.description = result.description;
      this.modified = result.modified;
      this.thumbnail = {
        path: result.thumbnail.path,
        extension: result.thumbnail.extension,
      };
      this.resourceURI = result.resourceURI;
      this.comics = new Comic(result.comics);
      this.series = new Comic(result.series);
      this.stories = new Comic(result.stories);
      this.events = new Comic(result.events);
      this.urls = [];
      result.urls.forEach(url =>
        this.urls.push(new Url(url))
      );
    }
  }
}

class Comic {
  constructor(comics) {
    if (comics) {
      this.available = comics.available;
      this.collectionURI = comics.collectionURI;
      this.items = [];
      comics.items.forEach(item =>
        this.items.push(new Item(item))
      );
      this.returned = comics.returned;
    }
  }
}

class Item {
  constructor(item) {
    if (item) {
      this.resourceURI = item.resourceURI;
      this.name = item.name;

      if (item.type) {
        this.type = item.type;
      }
    }
  }
}

class Url {
  constructor(url) {
    if (url) {
      this.type = url.type;
      this.url = url.url;
    }
  }
}