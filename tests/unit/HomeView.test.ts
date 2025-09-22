import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import HomeView from '@/presentation/views/HomeView.vue'

describe('HomeView', () => {
  it('renders the welcome message', () => {
    const wrapper = mount(HomeView)
    
    expect(wrapper.find('h1').text()).toBe('Welcome to Vue Clean Architecture Example')
    expect(wrapper.find('p').text()).toBe('This project demonstrates Clean Architecture principles applied to Vue 3.')
  })

  it('displays architecture layers', () => {
    const wrapper = mount(HomeView)
    
    const layers = wrapper.findAll('.layer')
    expect(layers).toHaveLength(3)
    
    expect(layers[0].find('h3').text()).toBe('Domain Layer')
    expect(layers[1].find('h3').text()).toBe('Data Layer')
    expect(layers[2].find('h3').text()).toBe('Presentation Layer')
  })
})
