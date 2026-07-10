export function App() {
    return (
        <main className="app-shell">
            <header className="page-header">
                <h1>React Clean Architecture Example</h1>
                <p>Vue에서 React로 전환한 뒤, 같은 Clean Architecture 구조를 단계적으로 리팩토링합니다.</p>
            </header>

            <section className="layer-grid" aria-label="Architecture layers">
                <article className="layer-card">
                    <h2>Domain Layer</h2>
                    <p>비즈니스 모델, repository interface, use case가 위치합니다.</p>
                </article>
                <article className="layer-card">
                    <h2>Data Layer</h2>
                    <p>DTO, mapper, datasource, repository 구현체가 외부 데이터를 다룹니다.</p>
                </article>
                <article className="layer-card">
                    <h2>Presentation Layer</h2>
                    <p>React page와 VM hook이 사용자 상호작용을 use case로 연결합니다.</p>
                </article>
            </section>
        </main>
    );
}
