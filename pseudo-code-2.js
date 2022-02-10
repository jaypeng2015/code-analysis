class MockService {

  a = 1;
  b = 2;

  getHandler(eventType) {
    if (eventType === 'a')
      return this.handlerA;

    return this.handlerB;
  }

  handlerA() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.a);
      }, 1000);
    })
  }


  handlerB() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.b);
      }, 1000);
    })
  }
}

(async () => {
  const service = new MockService();
  const handlerA = service.getHandler('a');
  const handlerB = service.getHandler('b');
  const res = await Promise.all([handlerA(), handlerB()]);
  console.log(res)
})()
