var expect = chai.expect;
import {Simulate, renderIntoDocument, createRenderer} from 'react-addons-test-utils';
import {shallow, mount} from 'enzyme';
import Counter from './Counter';
import React from 'react';

describe('Component Tests...', function () {
    describe('Counter Tests...', function () {
        it('should return default name John', function () {
            //given
            const counterView = renderIntoDocument(
                <Counter />
            );

            //when
            let {name} = counterView.state;

            //then
            expect(name).to.be.eq('John');
        });

        it('should handle click on text by cutting last letter', function (done) {
            //given
            const counterView = renderIntoDocument(
                <Counter />
            );

            //when
            counterView.setState({name: 'Mirek'});
            counterView.changeLetters().then(()=> {

                //then
                let {name} = counterView.state;
                expect(name).to.be.eq('Mire');
            }).then(done, done);
        });
        ita('should handle click on text by cutting last letter - await', async() => {
            //given
            const counterView = renderIntoDocument(
                <Counter />
            );

            //when
            counterView.setState({name: 'Mirek'});
            await counterView.changeLetters();

            //then
            let {name} = counterView.state;
            expect(name).to.be.eq('Mire');
        });
        ita('should handle click on text by cutting last letter (click simulation)', async()=> {
            //given
            const shallowRenderer = createRenderer();
            const counterView = renderIntoDocument(
                <Counter />
            );

            //when
            counterView.setState({name: 'Mirek'});
            Simulate.click(counterView.refs.result);
            await wait();

            //then
            var rootDiv = counterView.render();
            var h2 = rootDiv.props.children[1];
            var spans = h2.props.children;
            expect(JSON.stringify(spans)).to.be.eq(
                JSON.stringify([
                    <span style={{color:"green"}}>M</span>,
                    <span style={{color:"red"}}>i</span>,
                    <span style={{color:"green"}}>r</span>,
                    <span style={{color:"red"}}>e</span>]))
        });

        it('renders <Counter /> components', () => {
            //given


            //when
            const wrapper = mount(<Counter />);

            //then
            expect(wrapper.text()).to.be.contains('John')
        });
        ita('renders <Counter /> components and click on it', async() => {
            //given
            const wrapper = mount(<Counter />);

            //when
            wrapper.find('h2').simulate('click');
            await wait();

            //then
            expect(wrapper.text()).to.be.contains('Joh')
        });
    });
});

function ita(description, callback) {
    return it(description,
        async(done) => {
            try {
                await callback();
                done();
            } catch (err) {
                done(err);
            }
        }
    )
}

function wait(time = 600) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve();
        }, time)
    });
}


// function mochaAsync(fn) {
//     return async(done) => {
//         try {
//             await fn();
//             done();
//         } catch (err) {
//             done(err);
//         }
//     };
// };
//
// function ita(description, fn) {
//     it(description, mochaAsync(fn));
// };

