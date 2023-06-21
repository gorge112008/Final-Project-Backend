export default class DaoRepository {
    constructor(dao) {
      this.dao = dao;
    }
  
    async getData(limit, page, sort, query) {
      const datas = await this.dao.getData(limit, page, sort, query);
      return datas;
    }
  
    async getDataUnique(query) {
      let data = await this.dao.getDataUnique(query);
      return data;
    }
  
    async getDataId(id) {
      let data = await this.dao.getDataId(id);
      return data;
    }
    
    async getDatabyEmail(email) {
        let data = await this.dao.getDatabyEmail(email);
        return data;
    }

    async addData(newData) {
      let data = await this.dao.addData(newData);
      return data;
    }
    async updateData(id, body) {
      let data = await this.dao.updateData(id, body);
      return data;
    }
    async deleteData(id) {
      let data = await this.dao.deleteData(id);
      return data;
    }
  }
  