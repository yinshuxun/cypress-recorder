 // 01 创建应用
 describe('test_name', function() {

  it('what_it_does', function() {
 
    //  cy.visit('http://localhost:4200/workspace/cpaas-system~calico~cpaas-system/overview')

     cy.navigate('workspace/cpaas-system~calico~cpaas-system/overview')
  
     cy.getAludaUiNav('应用管理').click({force:true})
  
     cy.getAludaUiNav('自定义应用').click({force:true})
  
     cy.get('.aui-dropdown-button__content > .aui-button__content').click()
  
     cy.get('.aui-radio-button__label:nth-child(2)').click()
  
     cy.get('#aui-radio-1').type('on')
  
     cy.get('.aui-form-item__hint').click()
  
     cy.get('[data-cy=inputImage]').click()
  
     cy.get('[data-cy=inputImage]').click()
  
     cy.get('[data-cy=inputImage]').type('index.docker.io/library/ubuntu:latest ')
  
     cy.get('.aui-form-item__hint').click()
  
     cy.get('[data-cy=inputImage]').click()
  
     cy.get('[data-cy=inputImage]').type('index.docker.io/library/ubuntu:latest')
  
     cy.get('[aui-button="primary"] > .aui-button__content').click()
  
     cy.get('[data-cy="cancel"] > .aui-button__content').click()
  
  })
 
 })

 // 01 自定义应用创建 5 10
 it('what_it_does', function() {

  cy.viewport(2560, 750)

  cy.navigate('/workspace/cpaas-system~calico~cpaas-system/overview')

  cy.getAludaUiNav('应用管理').click({force:true})

  cy.getAludaUiNav('自定义应用').click({force:true})

  cy.intercept(/selfsubjectaccessreviews/).as('selfsubjectaccessreviews').wait('@selfsubjectaccessreviews');

   cy.get('* > [data-cy="createApp"] > .aui-dropdown-button > .aui-dropdown-button__content > .aui-button__content').contains('创建自定义应用').click()

  cy.get('.aui-radio-group > [data-cy="radioInput"] > .aui-radio-button > .aui-radio-button__label > .aui-radio-button__content').contains('输入').click()

  cy.get('.aui-form-item__control > .aui-radio-group > [data-cy="radioInput"] > .aui-radio-button > #aui-radio-1').type('on')

  cy.get('[data-cy=inputImage]').click()

  cy.get('[data-cy=inputImage]').type('index.docker.io')

  cy.get('* > aui-dialog-footer > .aui-dialog__footer > [aui-button="primary"] > .aui-button__content').contains('确定').click()

  cy.get('aui-card > .aui-card > .aui-card__content > *:nth-child(1) > .aui-form').contains('名称显示名称').click()

  cy.get('[data-cy=appName]').click()

  cy.get('[data-cy=appName]').type('app01')

  cy.get('* > * > * > [data-cy="submit"] > .aui-button__content').contains('创建').click()

  cy.getAludaUiNav('自定义应用').click({force:true})

  cy.get('.aui-card__header > * > [data-cy="search"] > .aui-search > [aui-input=""]').click()

  cy.get('.aui-card__header > * > [data-cy="search"] > .aui-search > [aui-input=""]').type('app01')

  cy.get('* > [data-cy="search"] > .aui-search > .aui-search__button > .aui-search__button-icon').click()

  cy.get('[data-cy=appAction]').click()

  cy.intercept(/selfsubjectaccessreviews/).as('selfsubjectaccessreviews').wait('@selfsubjectaccessreviews');

   cy.get('* > acl-disabled-container > * > [data-cy="appDelete"] > .aui-menu-item').contains('删除').click()

  cy.get('.aui-confirm-dialog > .aui-confirm-dialog__button-wrapper > * > .aui-button--primary > .aui-button__content').contains('删除').click()

})



 // 02 创建部署
 describe('test_name', function() {

  it('what_it_does', function() {
 
     cy.visit('http://localhost:4200/workspace/cpaas-system~calico~cpaas-system/overview')
  
     cy.getAludaUiNav('计算组件').click({force:true})
  
     cy.getAludaUiNav('部署').click({force:true})
  
     cy.get('.aui-dropdown-button__content > .aui-button__content').click()
  
     cy.get('.aui-radio-button__label:nth-child(2) > .aui-radio-button__content').click()
  
     cy.get('#aui-radio-6').type('on')
  
     cy.get('.aui-form-item__hint').click()
  
     cy.get('[data-cy=inputImage]').click()
  
     cy.get('[data-cy=inputImage]').type('index.docker.io/library/ubuntu:latest')
  
     cy.get('[aui-button="primary"] > .aui-button__content').click()
  
     cy.get('aui-radio-button:nth-child(2) > .aui-radio-button > .aui-radio-button__label > .aui-radio-button__content').click()
  
     cy.get('#aui-radio-8').type('on')
  
     cy.get('aui-radio-button:nth-child(1) > .aui-radio-button > .aui-radio-button__label').click()
  
     cy.get('#aui-radio-7').type('on')
  
     cy.get('aui-radio-button:nth-child(2) > .aui-radio-button > .aui-radio-button__label > .aui-radio-button__content').click()
  
     cy.get('#aui-radio-8').type('on')
  
     cy.get('*:nth-child(4) > *:nth-child(26)').click()
  
     cy.get('*:nth-child(2) > [aui-button=""] > .aui-button__content').click()
  
  })

 })

 // 部署删除

 describe('test_name', function() {

  it('what_it_does', function() {
 
     cy.visit('http://localhost:4200/workspace/cpaas-system~calico~cpaas-system/deployment')
  
     cy.get('.aui-table__row:nth-child(7) > .aui-table__cell > [aui-button="text"]').click()
  
     cy.get('*:nth-child(2) > * > aui-menu-item > .aui-menu-item').click()
  
     cy.get('*:nth-child(1) > [aui-button=""] > .aui-button__content').click()
  
     cy.get('.aui-table__row:nth-child(10) > .aui-table__cell > [aui-button="text"] .aui-icon > *').click()
  
     cy.get('*:nth-child(2) > * > aui-menu-item > .aui-menu-item').click()
  
     cy.get('*:nth-child(1) > [aui-button=""] > .aui-button__content').click()
  
     cy.get('.aui-page__content').click()
  
  })
 
 })

 // test
 describe('test_name', function() {

  it('what_it_does', function() {
 
     cy.visit('http://localhost:4200/workspace/cpaas-system~calico~cpaas-system/app/list?keyword=tet')
  
     cy.get('.aui-dropdown-button__content > .aui-button__content').click()
  
     cy.get('[data-cy="cancel"] > .aui-button__content').click()
  
  })
 
 })

 describe('test_name', function() {

  it('what_it_does', function() {
 
     cy.visit('http://localhost:4200/workspace/cpaas-system~calico~cpaas-system/app/list?keyword=tet')
  
     cy.get('* > [data-cy="createApp"] > .aui-dropdown-button > .aui-dropdown-button__content > .aui-button__content').click()
  
  })
 
 })

 describe('test_name', function() {

  it('what_it_does', function() {
 
     cy.visit('http://localhost:4200/workspace/cpaas-system~calico~cpaas-system/app/list?keyword=tet')
  
     cy.get('* > [data-cy="createApp"] > .aui-dropdown-button > .aui-dropdown-button__content > .aui-button__content').click()
  
     cy.get('* > aui-dialog-footer > .aui-dialog__footer > [aui-button=""] > .aui-button__content').click()
  
  })
 
 })

 describe('test_name', function() {

  it('what_it_does', function() {
 
     cy.visit('http://localhost:4200/workspace/cpaas-system~calico~cpaas-system/app/list?keyword=tet')
  
     cy.get('.acl-disabled-container > aui-dropdown-button > .aui-dropdown-button > .aui-dropdown-button__content > .aui-button__content').click()
  
  })
 
 })

 describe('test_name', function() {

  it('what_it_does', function() {
 
     cy.visit('http://localhost:4200/workspace/cpaas-system~calico~cpaas-system/app/list?keyword=tet')
  
     cy.get('div > aui-dropdown-button > .aui-dropdown-button > .aui-dropdown-button__content > .aui-button__content').click()
  
     cy.get('ng-component > aui-dialog-footer > .aui-dialog__footer > .aui-button--default > .aui-button__content').click()
  
  })
 
 })

 describe('test_name', function() {

  it('what_it_does', function() {
 
     cy.visit('http://localhost:4200/workspace/cpaas-system~calico~cpaas-system/app/list?keyword=tet')
  
     cy.get('div .aui-dropdown-button__content > .aui-button__content').click()
  
     cy.get('ng-component .aui-dialog__footer > .aui-button--default > .aui-button__content').click()
  
  })
 
 })

 describe('test_name', function() {

  it('what_it_does', function() {
 
     cy.visit('http://localhost:4200/workspace/cpaas-system~calico~cpaas-system/app/list?keyword=tet')
  
     cy.get('* > [data-cy="createApp"] > .aui-dropdown-button > .aui-dropdown-button__content > .aui-button__content').click()
  
  })
 
 })

 describe('test_name', function() {

  it('what_it_does', function() {
 
     cy.visit('http://localhost:4200/workspace/cpaas-system~calico~cpaas-system/app/list?keyword=tet')
  
     cy.get('* > [data-cy="createApp"] > .aui-dropdown-button > .aui-dropdown-button__content > .aui-button__content').click()
  
     cy.get('* > aui-dialog-footer > .aui-dialog__footer > [aui-button=""] > .aui-button__content').click()
  
  })
 
 })
 
 describe('test_name', function() {

  it('what_it_does', function() {
 
     cy.visit('http://localhost:4200/workspace/cpaas-system~calico~cpaas-system/app/list?keyword=tet')
  
     cy.get('*:nth-child(2) .aui-dropdown-button__content:nth-child(1) > .aui-button__content:nth-child(1)').click()
  
  })
 
 })

 describe('test_name', function() {

  it('what_it_does', function() {
 
     cy.visit('http://localhost:4200/workspace/cpaas-system~calico~cpaas-system/app/list?keyword=tet')
  
     cy.get('*:nth-child(2) > aui-card:nth-child(1) > .aui-card:nth-child(1) > .aui-card__header:nth-child(1) > acl-disabled-container:nth-child(1) > *:nth-child(1) > [data-cy="createApp"]:nth-child(1) > .aui-dropdown-button:nth-child(1) > .aui-dropdown-button__content:nth-child(1) > .aui-button__content:nth-child(1)').click()
  
     cy.get('* > * > #cdk-overlay-6 > aui-dialog > .aui-dialog > * > aui-dialog-footer > .aui-dialog__footer > [aui-button=""] > .aui-button__content').click()
  
  })
 
 })

 describe('test_name', function() {

  it('what_it_does', function() {
 
     cy.visit('http://localhost:4200/workspace/cpaas-system~calico~cpaas-system/app/list?keyword=tet')
  
     cy.get('* .aui-dropdown-button__content > .aui-button__content').click()
  
  })
 
 })


 describe('test_name', function() {

  it('what_it_does', function() {
 
     cy.visit('http://localhost:4200/workspace/cpaas-system~calico~cpaas-system/app/list')
  
     cy.intercept(/selfsubjectaccessreviews/).as('selfsubjectaccessreviews').wait('@selfsubjectaccessreviews');
  
 cy.get('.aui-dropdown-button__content > .aui-button__content').contains('创建自定义应用').click()
  
     cy.get('[data-cy="cancel"] > .aui-button__content').contains('取消').click()
  
  })
 
 })


 it('what_it_does', function() {

  cy.viewport(2560, 750)

  cy.navigate('/workspace/cpaas-system~calico~cpaas-system/app/list?keyword=app01')

  cy.get('[data-cy="search"] > .aui-search > .aui-search__clear > aui-icon > .aui-icon').click()

  cy.get('.aui-card__header > * > [data-cy="search"] > .aui-search > [aui-input=""]').click()

  cy.get('.aui-card__header > * > [data-cy="search"] > .aui-search > [aui-input=""]').click()

  cy.get('.aui-card__header > * > [data-cy="search"] > .aui-search > [aui-input=""]').type('app01')

  cy.get('.aui-search > .aui-search__button > .aui-search__button-icon > aui-icon > .aui-icon').click()

})


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 