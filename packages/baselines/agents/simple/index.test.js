const SimpleAgent = require('./')

test('chooses an action and dispatches to environment', () => {
  const environment = {
    getState: () => 'state',
    dispatch: jest.fn()
  }

  const policy = {
    chooseAction: jest.fn(() => 'action')
  }

  const agent = new SimpleAgent({ policy })
  agent.newEpisode(environment)

  agent.act()
  expect(policy.chooseAction).toBeCalledWith('state')
  expect(environment.dispatch).toBeCalledWith('action')
})
